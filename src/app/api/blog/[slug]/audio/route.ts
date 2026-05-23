import { NextRequest, NextResponse } from 'next/server'
import { getBlogBySlug } from '@/lib/data'

function stripMarkdown(md: string): string {
    return md
        .replace(/!\[.*?\]\(.*?\)/g, '')         // remove images
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links -> text
        .replace(/#{1,6}\s+/g, '')               // headings
        .replace(/\*\*([^*]+)\*\*/g, '$1')       // bold
        .replace(/\*([^*]+)\*/g, '$1')           // italic
        .replace(/`{1,3}[^`]*`{1,3}/g, '')       // code
        .replace(/^\|.*\|$/gm, '')               // tables
        .replace(/^[-*+]\s+/gm, '')              // list bullets
        .replace(/^>\s+/gm, '')                  // blockquotes
        .replace(/\n{3,}/g, '\n\n')              // collapse blank lines
        .trim()
}

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
        return NextResponse.json({ error: 'TTS not configured' }, { status: 503 })
    }

    const article = await getBlogBySlug(slug)
    if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    // Build the narration text: title + excerpt + body
    const narrationText = [
        article.title + '.',
        article.excerpt ? article.excerpt + '.' : '',
        stripMarkdown(article.body || ''),
    ].filter(Boolean).join('\n\n')

    // Truncate to OpenAI TTS limit (4096 chars)
    const text = narrationText.slice(0, 4096)

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'tts-1-hd',
            input: text,
            voice: 'onyx',   // deep, authoritative voice — best for technical content
            response_format: 'mp3',
            speed: 0.95,
        }),
    })

    if (!response.ok) {
        const err = await response.text()
        console.error('OpenAI TTS error:', err)
        return NextResponse.json({ error: 'TTS generation failed' }, { status: 502 })
    }

    const audioBuffer = await response.arrayBuffer()

    return new NextResponse(audioBuffer, {
        headers: {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=86400',
            'Content-Length': audioBuffer.byteLength.toString(),
        },
    })
}
