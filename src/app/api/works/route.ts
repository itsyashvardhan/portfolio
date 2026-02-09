import { NextResponse } from 'next/server'
import { getWorksList } from '@/lib/data'

export async function GET() {
    try {
        const data = await getWorksList()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Works API error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch works data' },
            { status: 500 }
        )
    }
}

// Example response:
// {
//   "projects": [
//     {
//       "slug": "portfolio-website",
//       "title": "Portfolio Website",
//       "description": "Personal portfolio built with Next.js and Neon DB",
//       "tech_stack": ["Next.js", "TypeScript", "Neon DB"],
//       "repo_url": "https://github.com/user/portfolio",
//       "demo_url": "https://example.com",
//       "project_status": "active",
//       "featured": true
//     }
//   ],
//   "featured": [
//     { /* featured projects */ }
//   ]
// }
