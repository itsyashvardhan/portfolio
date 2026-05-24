import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 300 // 5 min — only runs once per post, then cached

import { eq } from 'drizzle-orm'
import { createHash } from 'crypto'
import { Readable, PassThrough } from 'stream'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'

// Point fluent-ffmpeg at the static binary
if (ffmpegStatic) ffmpeg.setFfmpegPath(ffmpegStatic)
import { getBlogBySlug } from '@/lib/data'
import { fallbackBlogPosts } from '@/lib/fallback-content'
import { db, schema } from '@/lib/db'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

function contentHash(text: string): string {
    return createHash('sha256').update(text).digest('hex').slice(0, 16)
}

function pcmToWav(pcm: Buffer, sampleRate = 24000, channels = 1, bitsPerSample = 16): Buffer {
    const dataLen = pcm.byteLength
    const header = Buffer.alloc(44)
    header.write('RIFF', 0)
    header.writeUInt32LE(36 + dataLen, 4)
    header.write('WAVE', 8)
    header.write('fmt ', 12)
    header.writeUInt32LE(16, 16)
    header.writeUInt16LE(1, 20)
    header.writeUInt16LE(channels, 22)
    header.writeUInt32LE(sampleRate, 24)
    header.writeUInt32LE(sampleRate * channels * bitsPerSample / 8, 28)
    header.writeUInt16LE(channels * bitsPerSample / 8, 32)
    header.writeUInt16LE(bitsPerSample, 34)
    header.write('data', 36)
    header.writeUInt32LE(dataLen, 40)
    return Buffer.concat([header, pcm])
}

function toArrayBuffer(buf: Buffer): ArrayBuffer {
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

// Transcode WAV PCM → AAC/M4A at 96 kbps (mid of 64–128 range)
function encodeAAC(wav: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = []
        const input = new Readable({ read() { this.push(wav); this.push(null) } })
        const output = new PassThrough()
        output.on('data', (chunk: Buffer) => chunks.push(chunk))
        output.on('end', () => resolve(Buffer.concat(chunks)))
        output.on('error', reject)

        ffmpeg(input)
            .inputFormat('wav')
            .audioCodec('aac')
            .audioBitrate('64k')
            .audioChannels(1)
            .format('adts')   // raw ADTS AAC — universal browser support
            .on('error', reject)
            .pipe(output, { end: true })
    })
}

function aacResponse(aac: Buffer, rangeHeader?: string | null) {
    const total = aac.byteLength
    if (rangeHeader) {
        const [startStr, endStr] = rangeHeader.replace(/bytes=/, '').split('-')
        const start = parseInt(startStr, 10)
        const end = endStr ? parseInt(endStr, 10) : total - 1
        const chunk = aac.slice(start, end + 1)
        return new NextResponse(toArrayBuffer(chunk), {
            status: 206,
            headers: {
                'Content-Type': 'audio/aac',
                'Content-Range': `bytes ${start}-${end}/${total}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunk.byteLength.toString(),
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        })
    }
    return new NextResponse(toArrayBuffer(aac), {
        headers: {
            'Content-Type': 'audio/aac',
            'Accept-Ranges': 'bytes',
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Content-Length': total.toString(),
        },
    })
}

// ---------------------------------------------------------------------------
// Step 1: Generate podcast script via Gemini text model
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Podcast script prompt — generic template, works for any blog post.
// Voices: Aoede (female host) + Charon (male researcher/author).
// ---------------------------------------------------------------------------
const SCRIPT_PROMPT = `You are producing a structured audio podcast from a technical blog post.

SPEAKERS
- Aoede [female, host]: warm, curious, accessible. Introduces topics, guides the listener, asks clarifying questions, and bridges between sections. Keeps energy up without being hollow.
- Charon [male, researcher]: precise, authoritative, slightly dry. Explains findings as if he wrote them. Challenges surface-level readings and adds depth.

PODCAST STRUCTURE — follow this order exactly:

1. HEADING
   Aoede opens with exactly:
   "Welcome to ya·sh·var·dhan dot dev. I'm your host, and joining me today is the researcher behind this post. We're covering: [exact blog post title]."

2. TOPICS IN CRUX (overview)
   Aoede lists every section heading from the blog post, in order, as a preview of what's coming. Charon adds one sentence on why this body of work matters as a whole.

3. SECTION-BY-SECTION (body)
   Work through every section of the blog post in order — do not skip, merge, or paraphrase entire sections.
   - Each section starts with Aoede naming it: "[Skeptical/Curious/etc.] So the next part is about [section heading]…"
   - Charon explains the core idea of that section accurately, using the post as the sole source.
   - Aoede asks at least one follow-up per section that a non-expert listener would ask.
   - Charon answers. Include key data, thresholds, names, and findings from the post verbatim where they matter.

4. ENDING NOTE
   Aoede: summarise the single most important takeaway from the post in one sentence. Charon: one sentence on what changes if you apply this.

5. CREDITS
   Aoede closes with exactly:
   "This was a post by Yashvardhan Singh — ya·sh·var·dhan — published at ya·sh·var·dhan dot dev. If this resonated, share it. See you next time."

RULES
- Every line must start with exactly "Aoede: " or "Charon: "
- Use ONLY information from the blog post — no invented facts, no filler
- Inline delivery cues in square brackets (e.g. [curious], [skeptical], [measured], [warm]) — use sparingly, only where delivery meaningfully changes
- Length: cover every section fully — there is no word or time limit. Do not compress or skip content to fit a target length.
- Do not alter or paraphrase the HEADING or CREDITS lines

BLOG POST:
`

const SCRIPT_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite']

async function generateScript(articleText: string, apiKey: string, retries = 3): Promise<string> {
    for (const model of SCRIPT_MODELS) {
        for (let attempt = 0; attempt < retries; attempt++) {
            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: SCRIPT_PROMPT + articleText }] }],
                        generationConfig: { maxOutputTokens: 16384, temperature: 0.5 },
                    }),
                }
            )
            if (res.status === 429) {
                const retryAfter = parseInt(res.headers.get('retry-after') || '30', 10) * 1000
                const backoff = Math.max(retryAfter, (attempt + 1) * 15000)
                console.warn(`Script gen rate limited on ${model}, waiting ${backoff}ms`)
                await sleep(backoff)
                continue
            }
            if (res.status === 503 || res.status === 404) break  // try next model
            if (!res.ok) throw new Error(`Script generation failed: ${res.status} ${await res.text()}`)
            const json = await res.json()
            const script = json.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined
            if (!script) throw new Error('Script generation: empty response')
            return script.trim()
        }
    }
    throw new Error('All script generation models exhausted')
}

// ---------------------------------------------------------------------------
// Step 2: Multi-speaker TTS — 3.1 first, fallback to 2.5
// ---------------------------------------------------------------------------

// Chunk script into segments ≤ ~12K chars to stay under 16K token limit
function chunkScript(script: string, maxChars = 12000): string[] {
    if (script.length <= maxChars) return [script]
    const lines = script.split('\n')
    const chunks: string[] = []
    let current = ''
    for (const line of lines) {
        if (current.length + line.length + 1 > maxChars) {
            if (current) chunks.push(current.trim())
            current = line
        } else {
            current += (current ? '\n' : '') + line
        }
    }
    if (current) chunks.push(current.trim())
    return chunks
}

const TTS_MODELS = [
    { id: 'gemini-2.5-flash-preview-tts', sampleRate: 24000 },
    { id: 'gemini-3.1-flash-tts-preview', sampleRate: 24000 },
]

async function ttsChunk(chunk: string, apiKey: string, retries = 4): Promise<{ pcm: Buffer; sampleRate: number }> {
    for (const model of TTS_MODELS) {
        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const res = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${model.id}:generateContent?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: chunk }] }],
                            generationConfig: {
                                response_modalities: ['AUDIO'],
                                speech_config: {
                                    multi_speaker_voice_config: {
                                        speaker_voice_configs: [
                                            { speaker: 'Aoede', voice_config: { prebuilt_voice_config: { voice_name: 'Aoede' } } },
                                            { speaker: 'Charon', voice_config: { prebuilt_voice_config: { voice_name: 'Charon' } } },
                                        ],
                                    },
                                },
                            },
                        }),
                    }
                )

                if (res.status === 429) {
                    // Rate limited — back off and retry same model
                    const retryAfter = parseInt(res.headers.get('retry-after') || '30', 10) * 1000
                    const backoff = Math.max(retryAfter, (attempt + 1) * 12000)
                    console.warn(`Rate limited on ${model.id}, waiting ${backoff}ms`)
                    await sleep(backoff)
                    continue
                }
                if (res.status === 503 || res.status === 404) break  // try next model

                if (!res.ok) throw new Error(`TTS ${model.id}: ${res.status} ${await res.text()}`)

                const json = await res.json()
                const b64 = json.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data as string | undefined
                if (!b64) throw new Error(`${model.id}: no audio data`)

                return { pcm: Buffer.from(b64, 'base64'), sampleRate: model.sampleRate }
            } catch (err) {
                console.error(`TTS ${model.id} attempt ${attempt + 1} failed:`, err)
                if (attempt < retries - 1) await sleep(5000)
            }
        }
    }
    throw new Error('All TTS models exhausted')
}

async function multiSpeakerTTS(script: string, apiKey: string): Promise<{ pcm: Buffer; sampleRate: number }> {
    const chunks = chunkScript(script)
    const pcmParts: Buffer[] = []
    let sampleRate = 24000

    for (let i = 0; i < chunks.length; i++) {
        const result = await ttsChunk(chunks[i], apiKey)
        pcmParts.push(result.pcm)
        sampleRate = result.sampleRate
        // Brief pause between chunks to respect rate limits
        if (i < chunks.length - 1) await sleep(2000)
    }

    return { pcm: Buffer.concat(pcmParts), sampleRate }
}

// ---------------------------------------------------------------------------
// GET handler
// ---------------------------------------------------------------------------

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const rangeHeader = req.headers.get('range')
    const geminiKey = process.env.GEMINI_API_KEY

    if (!geminiKey) {
        return NextResponse.json({ error: 'TTS not configured' }, { status: 503 })
    }

    const article = await getBlogBySlug(slug) ?? fallbackBlogPosts.find(p => p.slug === slug) ?? null
    if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const articleText = [
        article.title + '.',
        article.excerpt ? article.excerpt + '.' : '',
        stripMarkdown(article.body || ''),
    ].filter(Boolean).join('\n\n')

    const hash = contentHash(articleText)

    // Serve from cache if content hasn't changed
    try {
        const [cached] = await db
            .select({ audio_b64: schema.podcastCache.audio_b64, content_hash: schema.podcastCache.content_hash })
            .from(schema.podcastCache)
            .where(eq(schema.podcastCache.slug, slug))
            .limit(1)

        if (cached && cached.content_hash === hash) {
            const aac = Buffer.from(cached.audio_b64, 'base64')
            return aacResponse(aac, rangeHeader)
        }
    } catch {
        // cache unavailable — generate fresh
    }

    try {
        // Step 1: Convert blog post to podcast script
        console.log('[audio] generating script for', slug)
        const script = await generateScript(articleText, geminiKey)
        console.log('[audio] script length', script.length)

        // Step 2: Synthesise dual-voice PCM
        console.log('[audio] starting TTS')
        const { pcm, sampleRate } = await multiSpeakerTTS(script, geminiKey)
        console.log('[audio] TTS done, pcm bytes', pcm.length)

        // Step 3: WAV wrapper → AAC 64 kbps
        console.log('[audio] encoding AAC')
        const wav = pcmToWav(pcm, sampleRate)
        const aac = await encodeAAC(wav)
        console.log('[audio] AAC bytes', aac.length)

        // Persist — upsert so stale entries are replaced on content change
        const b64 = aac.toString('base64')
        db.insert(schema.podcastCache)
            .values({ slug, audio_b64: b64, content_hash: hash })
            .onConflictDoUpdate({
                target: schema.podcastCache.slug,
                set: { audio_b64: b64, content_hash: hash },
            })
            .catch((e) => console.error('podcast cache write failed:', e))

        return aacResponse(aac, rangeHeader)
    } catch (err) {
        console.error('Podcast generation failed:', err)
        return NextResponse.json({ error: 'Podcast generation failed' }, { status: 502 })
    }
}
