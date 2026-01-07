// ============================================
// DATA FETCHING UTILITIES
// Centralized data access layer
// ============================================

import { createClient } from '@/lib/supabase/server'
import type {
    Blog,
    BlogListItem,
    Work,
    WorkListItem,
    Profile,
    Experience,
    Skill,
    SkillsByCategory,
    Education,
    Achievement,
    SocialLink,
    AboutPageData,
    BlogPageData,
    WorksPageData,
} from '@/lib/types'

// ============================================
// BLOG DATA ACCESS
// ============================================

export async function getBlogList(options?: {
    page?: number
    limit?: number
    tag?: string
}): Promise<BlogPageData> {
    const { page = 1, limit = 10, tag } = options || {}
    const supabase = await createClient()

    let query = supabase
        .from('blog')
        .select('slug, title, excerpt, banner_image, tags, read_time, created_at, published_at', { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })

    if (tag) {
        query = query.contains('tags', [tag])
    }

    const offset = (page - 1) * limit
    query = query.range(offset, offset + limit - 1)

    const { data, count, error } = await query

    if (error) {
        console.error('Error fetching blog list:', error)
        return { articles: [], total: 0, page, limit, hasMore: false }
    }

    return {
        articles: (data || []) as BlogListItem[],
        total: count || 0,
        page,
        limit,
        hasMore: (count || 0) > page * limit,
    }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

    if (error || !data) {
        return null
    }

    return data as Blog
}

export async function getAllBlogSlugs(): Promise<string[]> {
    const supabase = await createClient()

    const { data } = await supabase
        .from('blog')
        .select('slug')
        .eq('status', 'published')

    return (data || []).map((item: { slug: string }) => item.slug)
}

// ============================================
// WORKS/PROJECTS DATA ACCESS
// ============================================

export async function getWorksList(): Promise<WorksPageData> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('works')
        .select('slug, title, description, outcome, tech_stack, repo_url, demo_url, demo_label, project_status, featured')
        .eq('status', 'published')
        .order('display_order', { ascending: true })

    if (error) {
        console.error('Error fetching works:', error)
        return { projects: [], featured: [] }
    }

    const projects = (data || []) as WorkListItem[]

    return {
        projects,
        featured: projects.filter(p => p.featured),
    }
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('works')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

    if (error || !data) {
        return null
    }

    return data as Work
}

export async function getAllWorkSlugs(): Promise<string[]> {
    const supabase = await createClient()

    const { data } = await supabase
        .from('works')
        .select('slug')
        .eq('status', 'published')

    return (data || []).map((item: { slug: string }) => item.slug)
}

// ============================================
// ABOUT PAGE DATA ACCESS
// ============================================

export async function getProfile(): Promise<Profile | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .limit(1)
        .single()

    if (error) {
        // Return default profile from env vars if table doesn't exist or is empty
        const ownerName = process.env.NEXT_PUBLIC_OWNER_NAME || 'Your Name'
        const ownerTitle = process.env.NEXT_PUBLIC_OWNER_TITLE || 'Software Engineer'
        return {
            id: 'default',
            name: ownerName,
            title: ownerTitle,
            bio: 'I design and build systems that ship.',
            profile_image: null,
            location: 'Remote',
            available_for_work: true,
            resume_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
    }

    return data as Profile
}

export async function getExperiences(): Promise<Experience[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('display_order', { ascending: true })

    if (error) {
        console.error('Error fetching experiences:', error)
        return []
    }

    return (data || []) as Experience[]
}

export async function getSkills(): Promise<SkillsByCategory> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true })

    if (error) {
        console.error('Error fetching skills:', error)
        return {
            languages: [],
            frameworks: [],
            tools: [],
            'soft-skills': [],
            general: [],
        }
    }

    const skills = (data || []) as Skill[]

    return {
        languages: skills.filter(s => s.category === 'languages'),
        frameworks: skills.filter(s => s.category === 'frameworks'),
        tools: skills.filter(s => s.category === 'tools'),
        'soft-skills': skills.filter(s => s.category === 'soft-skills'),
        general: skills.filter(s => s.category === 'general'),
    }
}

export async function getEducation(): Promise<Education[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('display_order', { ascending: true })

    if (error) {
        console.error('Error fetching education:', error)
        return []
    }

    return (data || []) as Education[]
}

export async function getAchievements(): Promise<Achievement[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('display_order', { ascending: true })

    if (error) {
        console.error('Error fetching achievements:', error)
        return []
    }

    return (data || []) as Achievement[]
}

export async function getSocialLinks(): Promise<SocialLink[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('display_order', { ascending: true })

    if (error) {
        // Return defaults from env vars if social_links table doesn't exist
        const ownerEmail = process.env.NEXT_PUBLIC_OWNER_EMAIL || 'email@example.com'
        const ownerGithub = process.env.NEXT_PUBLIC_OWNER_GITHUB || 'https://github.com/username'
        const ownerLinkedin = process.env.NEXT_PUBLIC_OWNER_LINKEDIN || 'https://linkedin.com/in/username'

        return [
            { id: '1', platform: 'email', url: `mailto:${ownerEmail}`, display_name: ownerEmail, icon: null, display_order: 1, created_at: '' },
            { id: '2', platform: 'github', url: ownerGithub, display_name: 'GitHub', icon: null, display_order: 2, created_at: '' },
            { id: '3', platform: 'linkedin', url: ownerLinkedin, display_name: 'LinkedIn', icon: null, display_order: 3, created_at: '' },
        ]
    }

    return (data || []) as SocialLink[]
}

// Combined About Page Data
export async function getAboutPageData(): Promise<AboutPageData> {
    const [profile, experiences, skills, education, achievements, socialLinks] = await Promise.all([
        getProfile(),
        getExperiences(),
        getSkills(),
        getEducation(),
        getAchievements(),
        getSocialLinks(),
    ])

    return {
        profile,
        experiences,
        skills,
        education,
        achievements,
        socialLinks,
    }
}

// ============================================
// SETTINGS DATA ACCESS
// ============================================

export async function getSettings(): Promise<Record<string, string>> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('settings')
        .select('key, value')

    if (error) {
        console.error('Error fetching settings:', error)
        return {}
    }

    return (data || []).reduce((acc: Record<string, string>, curr: { key: string; value: string }) => ({ ...acc, [curr.key]: curr.value }), {})
}
