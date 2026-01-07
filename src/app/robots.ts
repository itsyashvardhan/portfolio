import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

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

