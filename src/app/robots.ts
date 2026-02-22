import { MetadataRoute } from 'next'
import { getSiteConfig } from '@/lib/site-config'

export default async function robots(): Promise<MetadataRoute.Robots> {
    const site = await getSiteConfig()
    const baseUrl = site.siteUrl

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/ssh/', '/verify/', '/api/', '/auth/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/ssh/', '/verify/', '/api/', '/auth/'],
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: ['/ssh/', '/verify/', '/api/', '/auth/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}
