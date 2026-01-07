import { NextResponse } from 'next/server'
import { getWorksList } from '@/lib/data'

export async function GET() {
    const data = await getWorksList()
    return NextResponse.json(data)
}

// Example response:
// {
//   "projects": [
//     {
//       "slug": "portfolio-website",
//       "title": "Portfolio Website",
//       "description": "Personal portfolio built with Next.js and Supabase",
//       "tech_stack": ["Next.js", "TypeScript", "Supabase"],
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
