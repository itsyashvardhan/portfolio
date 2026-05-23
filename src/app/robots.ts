import { MetadataRoute } from 'next'
import { getSiteConfig } from '@/lib/site-config'

export default async function robots(): Promise<MetadataRoute.Robots> {
    const site = await getSiteConfig()
    const baseUrl = site.siteUrl

    return {
        rules: [
            // Search engines — full access
            {
                userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot'],
                allow: '/',
                disallow: ['/api/', '/auth/', '/ssh/', '/verify/'],
            },
            // AI training crawlers — blog metadata only
            {
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'CCBot',
                    'anthropic-ai',
                    'Claude-Web',
                    'PerplexityBot',
                    'cohere-ai',
                    'Diffbot',
                    'omgili',
                    'facebookexternalhit',
                ],
                allow: ['/blog', '/blog/'],
                disallow: ['/', '/works', '/about', '/india-ai', '/api/'],
            },
            // Everyone else
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/auth/', '/ssh/', '/verify/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}
