import { NextRequest, NextResponse } from 'next/server'
import { getWorkBySlug } from '@/lib/data'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const work = await getWorkBySlug(slug)

    if (!work) {
        return NextResponse.json(
            { error: 'Work not found' },
            { status: 404 }
        )
    }

    return NextResponse.json({ data: work })
}

// Example response:
// {
//   "data": {
//     "id": "uuid",
//     "slug": "portfolio-website",
//     "title": "Portfolio Website",
//     "description": "Personal portfolio built with Next.js",
//     "problem": "Needed a fast, modern portfolio",
//     "constraints": "Budget: $0, Time: 1 week",
//     "decisions": "Chose Next.js for SSR and performance",
//     "tech_context": "Deployed on Vercel with Supabase backend",
//     "outcome": "Sub-second page loads, 95+ Lighthouse score",
//     "body": "# Full markdown content...",
//     "role": "Full Stack Developer",
//     "tech_stack": ["Next.js", "TypeScript", "Supabase"],
//     "repo_url": "https://github.com/user/portfolio",
//     "demo_url": "https://example.com",
//     "project_status": "active",
//     "featured": true,
//     "status": "published",
//     "display_order": 1,
//     "created_at": "2024-01-01T00:00:00Z",
//     "updated_at": "2024-01-15T00:00:00Z"
//   }
// }
