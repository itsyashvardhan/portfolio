import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { getBlogBySlug } from '@/lib/data'
import { fallbackBlogPosts } from '@/lib/fallback-content'
import { db, schema } from '@/lib/db'

function stripMarkdown(md: string): string {
    return md
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/#{1,6}\s+/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`{1,3}[^`]*`{1,3}/g, '')
        .replace(/^\|.*\|$/gm, '')
        .replace(/^[-*+]\s+/gm, '')
        .replace(/^>\s+/gm, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
}

function pcmToWav(pcm: Buffer, sampleRate = 24000, channels = 1, bitsPerSample = 16): Buffer {
    const dataLen = pcm.byteLength
    const header = Buffer.alloc(44)
    header.write('RIFF', 0)
    header.writeUInt32LE(36 + dataLen, 4)
    header.write('WAVE', 8)
    header.write('fmt ', 12)
    header.writeUInt32LE(16, 16)             // PCM chunk size
    header.writeUInt16LE(1, 20)              // PCM format
    header.writeUInt16LE(channels, 22)
    header.writeUInt32LE(sampleRate, 24)
    header.writeUInt32LE(sampleRate * channels * bitsPerSample / 8, 28) // byte rate
    header.writeUInt16LE(channels * bitsPerSample / 8, 32)              // block align
    header.writeUInt16LE(bitsPerSample, 34)
    header.write('data', 36)
    header.writeUInt32LE(dataLen, 40)
    return Buffer.concat([header, pcm])
}

function bufferResponse(buffer: ArrayBuffer, contentType = 'audio/mpeg') {
    return new NextResponse(buffer, {
        headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Content-Length': buffer.byteLength.toString(),
        },
    })
}

async function elevenLabsTTS(text: string, apiKey: string): Promise<ArrayBuffer> {
    const voiceId = 'SAz9YHcvj6GT2YYXdXww' // River — gender-neutral, warm
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
            'xi-api-key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
            text: text.slice(0, 5000),
            model_id: 'eleven_v3',
            voice_settings: {
                stability: 0.38,
                similarity_boost: 0.78,
                style: 0.22,
                use_speaker_boost: true,
                speed: 0.94,
            },
        }),
    })
    if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`)
    return res.arrayBuffer()
}

async function geminiTTS(text: string, apiKey: string): Promise<ArrayBuffer> {
    // Kore — calm, clear, neutral voice. Good for technical content.
    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text.slice(0, 5000) }] }],
                generationConfig: {
                    response_modalities: ['AUDIO'],
                    speech_config: {
                        voice_config: {
                            prebuilt_voice_config: { voice_name: 'Zephyr' },
                        },
                    },
                },
            }),
        }
    )
    if (!res.ok) throw new Error(`Gemini TTS ${res.status}: ${await res.text()}`)
    const json = await res.json()
    const b64 = json.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data
    if (!b64) throw new Error('Gemini TTS: no audio data in response')
    const pcm = Buffer.from(b64, 'base64')
    const wav = pcmToWav(pcm)
    return wav.buffer.slice(wav.byteOffset, wav.byteOffset + wav.byteLength) as ArrayBuffer
}

async function openAITTS(text: string, apiKey: string): Promise<ArrayBuffer> {
    const res = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'tts-1-hd',
            input: text.slice(0, 4096),
            voice: 'onyx',
            response_format: 'mp3',
            speed: 0.95,
        }),
    })
    if (!res.ok) throw new Error(`OpenAI TTS ${res.status}: ${await res.text()}`)
    return res.arrayBuffer()
}

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params

    const geminiKey = process.env.GEMINI_API_KEY
    const elevenKey = process.env.ELEVENLABS_API_KEY
    const openAIKey = process.env.OPENAI_API_KEY

    if (!geminiKey && !elevenKey && !openAIKey) {
        return NextResponse.json({ error: 'TTS not configured' }, { status: 503 })
    }

    // Serve from cache if already generated
    try {
        const [cached] = await db
            .select({ audio_b64: schema.podcastCache.audio_b64 })
            .from(schema.podcastCache)
            .where(eq(schema.podcastCache.slug, slug))
            .limit(1)

        if (cached) {
            const buffer = Buffer.from(cached.audio_b64, 'base64')
            return bufferResponse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer)
        }
    } catch {
        // cache table unavailable — fall through to generate
    }

    const article = await getBlogBySlug(slug) ?? fallbackBlogPosts.find(p => p.slug === slug) ?? null
    if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const text = [
        article.title + '.',
        article.excerpt ? article.excerpt + '.' : '',
        stripMarkdown(article.body || ''),
    ].filter(Boolean).join('\n\n')

    let buffer: ArrayBuffer | null = null

    const providers: Array<() => Promise<ArrayBuffer>> = [
        ...(geminiKey ? [() => geminiTTS(text, geminiKey)] : []),
        ...(elevenKey ? [() => elevenLabsTTS(text, elevenKey)] : []),
        ...(openAIKey ? [() => openAITTS(text, openAIKey)] : []),
    ]

    for (const provider of providers) {
        try {
            buffer = await provider()
            break
        } catch (err) {
            console.error('TTS provider failed, trying next:', err)
        }
    }

    if (!buffer) {
        return NextResponse.json({ error: 'TTS generation failed' }, { status: 502 })
    }

    // Persist to cache (fire and forget)
    const b64 = Buffer.from(buffer).toString('base64')
    db.insert(schema.podcastCache)
        .values({ slug, audio_b64: b64 })
        .onConflictDoNothing()
        .catch((e) => console.error('podcast cache write failed:', e))

    const isWav = geminiKey && buffer
    return bufferResponse(buffer, isWav ? 'audio/wav' : 'audio/mpeg')
}
