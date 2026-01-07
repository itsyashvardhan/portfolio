import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
    const supabase = await createClient()

    // Fetch all published works
    const { data: works } = await supabase
        .from('works')
        .select('slug, updated_at')
        .eq('status', 'published')

    // Fetch all published blog posts
    const { data: blogs } = await supabase
        .from('Blog')
        .select('slug, updated_at')
        .eq('status', 'published')

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
    ]

    // Dynamic work pages
    const workPages: MetadataRoute.Sitemap = (works || []).map((work: { slug: string; updated_at: string }) => ({
        url: `${baseUrl}/works/${work.slug}`,
        lastModified: new Date(work.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Dynamic blog pages
    const blogPages: MetadataRoute.Sitemap = (blogs || []).map((blog: { slug: string; updated_at: string }) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...staticPages, ...workPages, ...blogPages]
}
