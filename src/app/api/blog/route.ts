import { NextRequest, NextResponse } from 'next/server'
import { getBlogList } from '@/lib/data'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1', 10)
        const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 50)
        const tag = searchParams.get('tag') || undefined

        const data = await getBlogList({ page, limit, tag })

        return NextResponse.json(data)
    } catch (error) {
        console.error('Blog API error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch blog data' },
            { status: 500 }
        )
    }
}

// Example response:
// {
//   "articles": [
//     {
//       "slug": "building-scalable-systems",
//       "title": "Building Scalable Systems",
//       "excerpt": "Lessons learned from scaling to millions of users",
//       "banner_image": "https://example.com/image.jpg",
//       "tags": ["architecture", "scaling"],
//       "read_time": 8,
//       "created_at": "2024-01-15T10:00:00Z",
//       "published_at": "2024-01-15T12:00:00Z"
//     }
//   ],
//   "total": 25,
//   "page": 1,
//   "limit": 10,
//   "hasMore": true
// }
