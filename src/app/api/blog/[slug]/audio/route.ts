import { NextRequest, NextResponse } from 'next/server'
import { getBlogBySlug } from '@/lib/data'

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

async function elevenLabsTTS(text: string, apiKey: string): Promise<ArrayBuffer> {
    // River — ElevenLabs' gender-neutral voice, warm and conversational.
    // Paired with eleven_v3 (English) for natural rhythm and engagement.
    const voiceId = 'SAz9YHcvj6GT2YYXdXww'
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
                stability: 0.38,        // some natural variation — avoids robotic flatness
                similarity_boost: 0.78, // stays true to the voice character
                style: 0.22,            // light expressiveness — draws the listener in
                use_speaker_boost: true,
                speed: 0.94,            // just slightly slower — easier to follow
            },
        }),
    })
    if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`)
    return res.arrayBuffer()
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

    const elevenKey = process.env.ELEVENLABS_API_KEY
    const openAIKey = process.env.OPENAI_API_KEY

    if (!elevenKey && !openAIKey) {
        return NextResponse.json({ error: 'TTS not configured' }, { status: 503 })
    }

    const article = await getBlogBySlug(slug)
    if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const text = [
        article.title + '.',
        article.excerpt ? article.excerpt + '.' : '',
        stripMarkdown(article.body || ''),
    ].filter(Boolean).join('\n\n')

    try {
        const buffer = elevenKey
            ? await elevenLabsTTS(text, elevenKey)
            : await openAITTS(text, openAIKey!)

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Cache-Control': 'public, max-age=86400',
                'Content-Length': buffer.byteLength.toString(),
            },
        })
    } catch (err) {
        console.error('TTS error:', err)
        // If ElevenLabs failed and we have OpenAI as fallback, try it
        if (elevenKey && openAIKey) {
            try {
                const buffer = await openAITTS(text, openAIKey)
                return new NextResponse(buffer, {
                    headers: {
                        'Content-Type': 'audio/mpeg',
                        'Cache-Control': 'public, max-age=86400',
                        'Content-Length': buffer.byteLength.toString(),
                    },
                })
            } catch (fallbackErr) {
                console.error('OpenAI TTS fallback error:', fallbackErr)
            }
        }
        return NextResponse.json({ error: 'TTS generation failed' }, { status: 502 })
    }
}
