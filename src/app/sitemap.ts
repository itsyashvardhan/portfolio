import { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { works as worksTable, blog } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getSiteConfig } from '@/lib/site-config'
import { fallbackBlogPosts } from '@/lib/fallback-content'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const site = await getSiteConfig()
    const baseUrl = site.siteUrl

    let works: { slug: string; updated_at: string | null }[] = []
    let blogs: { slug: string; updated_at: string | null }[] = []

    try {
        works = await db
            .select({ slug: worksTable.slug, updated_at: worksTable.updated_at })
            .from(worksTable)
            .where(eq(worksTable.status, 'published'))
    } catch { /* use empty */ }

    try {
        const dbBlogs = await db
            .select({ slug: blog.slug, updated_at: blog.updated_at })
            .from(blog)
            .where(eq(blog.status, 'published'))
        blogs = dbBlogs.length > 0
            ? dbBlogs
            : fallbackBlogPosts.map(p => ({ slug: p.slug, updated_at: p.published_at ?? null }))
    } catch {
        blogs = fallbackBlogPosts.map(p => ({ slug: p.slug, updated_at: p.published_at ?? null }))
    }

    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
        { url: `${baseUrl}/works`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/india-ai`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ]

    const workPages: MetadataRoute.Sitemap = works.map((work) => ({
        url: `${baseUrl}/works/${work.slug}`,
        lastModified: work.updated_at ? new Date(work.updated_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const blogPages: MetadataRoute.Sitemap = blogs.map((b) => ({
        url: `${baseUrl}/blog/${b.slug}`,
        lastModified: b.updated_at ? new Date(b.updated_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    return [...staticPages, ...workPages, ...blogPages]
}
