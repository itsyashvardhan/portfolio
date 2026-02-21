import { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { works as worksTable, blog } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// Force dynamic rendering — sitemap needs DB access
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

    // Fetch all published works
    const works = await db
        .select({ slug: worksTable.slug, updated_at: worksTable.updated_at })
        .from(worksTable)
        .where(eq(worksTable.status, 'published'))

    // Fetch all published blog posts
    const blogs = await db
        .select({ slug: blog.slug, updated_at: blog.updated_at })
        .from(blog)
        .where(eq(blog.status, 'published'))

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/works`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/india-ai`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]

    // Dynamic work pages
    const workPages: MetadataRoute.Sitemap = (works || []).map((work) => ({
        url: `${baseUrl}/works/${work.slug}`,
        lastModified: work.updated_at ? new Date(work.updated_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Dynamic blog pages
    const blogPages: MetadataRoute.Sitemap = (blogs || []).map((b) => ({
        url: `${baseUrl}/blog/${b.slug}`,
        lastModified: b.updated_at ? new Date(b.updated_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...staticPages, ...workPages, ...blogPages]
}
