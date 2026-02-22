import { cache } from 'react'
import { db } from '@/lib/db'
import { settings } from '@/lib/db/schema'

export interface SiteConfig {
    siteUrl: string
    ownerName: string
    ownerTitle: string
    ownerEmail: string
    ownerGithub: string
    ownerLinkedin: string
    ownerTwitter: string
    heroName: string
    heroPhonetic: string
    heroTagline: string
    logoText: string
}

const DEFAULT_SITE_CONFIG: SiteConfig = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
    ownerName: process.env.NEXT_PUBLIC_OWNER_NAME || 'Your Name',
    ownerTitle: process.env.NEXT_PUBLIC_OWNER_TITLE || 'Software Engineer',
    ownerEmail: process.env.NEXT_PUBLIC_OWNER_EMAIL || 'email@example.com',
    ownerGithub: process.env.NEXT_PUBLIC_OWNER_GITHUB || 'https://github.com/username',
    ownerLinkedin: process.env.NEXT_PUBLIC_OWNER_LINKEDIN || 'https://linkedin.com/in/username',
    ownerTwitter: process.env.NEXT_PUBLIC_OWNER_TWITTER || '@username',
    heroName: process.env.NEXT_PUBLIC_HERO_NAME || 'यशवर्धन',
    heroPhonetic: process.env.NEXT_PUBLIC_HERO_PHONETIC || '',
    heroTagline: process.env.NEXT_PUBLIC_HERO_TAGLINE || 'I design systems that ship.',
    logoText: process.env.NEXT_PUBLIC_LOGO_TEXT || '◈',
}

function ensureAbsoluteUrl(url: string): string {
    if (!url) return DEFAULT_SITE_CONFIG.siteUrl
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return `https://${url}`
}

function mapSettingsToConfig(settingsMap: Record<string, string>): SiteConfig {
    return {
        siteUrl: ensureAbsoluteUrl(settingsMap.site_url || DEFAULT_SITE_CONFIG.siteUrl),
        ownerName: settingsMap.owner_name || DEFAULT_SITE_CONFIG.ownerName,
        ownerTitle: settingsMap.owner_title || DEFAULT_SITE_CONFIG.ownerTitle,
        ownerEmail: settingsMap.owner_email || DEFAULT_SITE_CONFIG.ownerEmail,
        ownerGithub: settingsMap.owner_github || DEFAULT_SITE_CONFIG.ownerGithub,
        ownerLinkedin: settingsMap.owner_linkedin || DEFAULT_SITE_CONFIG.ownerLinkedin,
        ownerTwitter: settingsMap.owner_twitter || DEFAULT_SITE_CONFIG.ownerTwitter,
        heroName: settingsMap.hero_name || DEFAULT_SITE_CONFIG.heroName,
        heroPhonetic: settingsMap.hero_phonetic || DEFAULT_SITE_CONFIG.heroPhonetic,
        heroTagline: settingsMap.hero_tagline || DEFAULT_SITE_CONFIG.heroTagline,
        logoText: settingsMap.logo_text || DEFAULT_SITE_CONFIG.logoText,
    }
}

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
    try {
        const rows = await db
            .select({ key: settings.key, value: settings.value })
            .from(settings)

        const settingsMap = rows.reduce<Record<string, string>>((acc, row) => {
            acc[row.key] = row.value
            return acc
        }, {})

        return mapSettingsToConfig(settingsMap)
    } catch (error) {
        console.error('Error fetching site config from settings:', error)
        return DEFAULT_SITE_CONFIG
    }
})
