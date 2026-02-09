import { NextResponse } from 'next/server'
import { getAboutPageData } from '@/lib/data'

export async function GET() {
    try {
        const data = await getAboutPageData()
        return NextResponse.json(data)
    } catch (error) {
        console.error('About API error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch about data' },
            { status: 500 }
        )
    }
}

// Example response:
// {
//   "profile": {
//     "id": "uuid",
//     "name": "Your Name",
//     "title": "Product & Solutions Engineer",
//     "bio": "I design and build systems that ship...",
//     "profile_image": "https://example.com/avatar.jpg",
//     "location": "India",
//     "available_for_work": true,
//     "resume_url": "https://example.com/resume.pdf",
//     "created_at": "2024-01-01T00:00:00Z",
//     "updated_at": "2024-01-15T00:00:00Z"
//   },
//   "experiences": [
//     {
//       "id": "uuid",
//       "organization": "Tech Company",
//       "role": "Senior Engineer",
//       "start_date": "2022-01-01",
//       "end_date": null,
//       "highlights": ["Led team of 5", "Shipped 3 major features"],
//       "display_order": 1,
//       "created_at": "2024-01-01T00:00:00Z"
//     }
//   ],
//   "skills": {
//     "languages": [{ "id": "uuid", "name": "TypeScript", "category": "languages", "proficiency": 90, "display_order": 1, "created_at": "..." }],
//     "frameworks": [...],
//     "tools": [...],
//     "soft-skills": [...],
//     "general": [...]
//   },
//   "education": [
//     {
//       "id": "uuid",
//       "institution": "University Name",
//       "degree": "B.Tech",
//       "field": "Computer Science",
//       "start_date": "2018-08-01",
//       "end_date": "2022-05-01",
//       "description": null,
//       "display_order": 1,
//       "created_at": "2024-01-01T00:00:00Z"
//     }
//   ],
//   "achievements": [
//     {
//       "id": "uuid",
//       "title": "Hackathon Winner",
//       "description": "Won first place at XYZ Hackathon",
//       "date": "2023-06-15",
//       "link": "https://example.com/hackathon",
//       "icon": "🏆",
//       "display_order": 1,
//       "created_at": "2024-01-01T00:00:00Z"
//     }
//   ],
//   "socialLinks": [
//     {
//       "id": "uuid",
//       "platform": "github",
//       "url": "https://github.com/username",
//       "display_name": "GitHub",
//       "icon": null,
//       "display_order": 1,
//       "created_at": "2024-01-01T00:00:00Z"
//     }
//   ]
// }
