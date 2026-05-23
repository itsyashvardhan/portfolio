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
            // AI crawlers — public content allowed, private routes blocked
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
                allow: ['/', '/works', '/about', '/blog'],
                disallow: ['/api/', '/auth/', '/ssh/', '/verify/'],
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
