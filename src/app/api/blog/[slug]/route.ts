import { NextRequest, NextResponse } from 'next/server'
import { getBlogBySlug } from '@/lib/data'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const article = await getBlogBySlug(slug)

        if (!article) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ data: article })
    } catch (error) {
        console.error('Blog slug API error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch article' },
            { status: 500 }
        )
    }
}

// Example response:
// {
//   "data": {
//     "id": "uuid",
//     "slug": "building-scalable-systems",
//     "title": "Building Scalable Systems",
//     "body": "# Introduction\n\nThis is the full markdown content...",
//     "excerpt": "Lessons learned from scaling to millions of users",
//     "banner_image": "https://example.com/image.jpg",
//     "tags": ["architecture", "scaling"],
//     "read_time": 8,
//     "status": "published",
//     "seo_title": "Building Scalable Systems | Your Site",
//     "seo_description": "Learn how to build systems that scale",
//     "published_at": "2024-01-15T12:00:00Z",
//     "created_at": "2024-01-15T10:00:00Z",
//     "updated_at": "2024-01-15T12:00:00Z"
//   }
// }
