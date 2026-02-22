import { db } from '@/lib/db'
import {
    blog,
    works,
    profile,
    experience,
    skills,
    education,
    achievements,
    socialLinks,
    settings,
} from '@/lib/db/schema'
import { eq, desc, asc, sql, and, arrayContains } from 'drizzle-orm'
import {
    fallbackBlogListItems,
    fallbackBlogPosts,
    fallbackWorkListItems,
    fallbackWorks,
} from '@/lib/fallback-content'
import { getSiteConfig } from '@/lib/site-config'
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

export async function getBlogList(options?: {
    page?: number
    limit?: number
    tag?: string
}): Promise<BlogPageData> {
    const { page = 1, limit = 10, tag } = options || {}
    const offset = (page - 1) * limit

    try {
        const conditions = [eq(blog.status, 'published')]
        if (tag) {
            conditions.push(arrayContains(blog.tags, [tag]))
        }

        const whereClause = conditions.length === 1 ? conditions[0] : and(...conditions)

        const [articles, countResult] = await Promise.all([
            db
                .select({
                    slug: blog.slug,
                    title: blog.title,
                    excerpt: blog.excerpt,
                    banner_image: blog.banner_image,
                    tags: blog.tags,
                    read_time: blog.read_time,
                    created_at: blog.created_at,
                    published_at: blog.published_at,
                })
                .from(blog)
                .where(whereClause)
                .orderBy(desc(blog.published_at), desc(blog.created_at))
                .limit(limit)
                .offset(offset),
            db
                .select({ count: sql<number>`count(*)::int` })
                .from(blog)
                .where(whereClause),
        ])

        const total = countResult[0]?.count || 0

        return {
            articles: articles as BlogListItem[],
            total,
            page,
            limit,
            hasMore: total > page * limit,
        }
    } catch (e) {
        console.error('Error fetching blog list:', e)
        const filtered = tag
            ? fallbackBlogListItems.filter((item) => item.tags.includes(tag))
            : fallbackBlogListItems
        const paginated = filtered.slice(offset, offset + limit)

        return {
            articles: paginated,
            total: filtered.length,
            page,
            limit,
            hasMore: filtered.length > page * limit,
        }
    }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    try {
        const [result] = await db
            .select()
            .from(blog)
            .where(and(eq(blog.slug, slug), eq(blog.status, 'published')))
            .limit(1)

        return (result as Blog) || null
    } catch (e) {
        console.error('Error fetching blog by slug:', e)
        return fallbackBlogPosts.find((post) => post.slug === slug) || null
    }
}

export async function getAllBlogSlugs(): Promise<string[]> {
    try {
        const result = await db
            .select({ slug: blog.slug })
            .from(blog)
            .where(eq(blog.status, 'published'))

        return result.map(item => item.slug)
    } catch (e) {
        console.error('Error fetching blog slugs:', e)
        return fallbackBlogPosts.map((post) => post.slug)
    }
}

export async function getWorksList(): Promise<WorksPageData> {
    try {
        const result = await db
            .select({
                slug: works.slug,
                title: works.title,
                description: works.description,
                outcome: works.outcome,
                tech_stack: works.tech_stack,
                repo_url: works.repo_url,
                demo_url: works.demo_url,
                demo_label: works.demo_label,
                project_status: works.project_status,
                featured: works.featured,
            })
            .from(works)
            .where(eq(works.status, 'published'))
            .orderBy(asc(works.display_order))

        const projects = result as WorkListItem[]
        if (projects.length === 0) {
            return {
                projects: fallbackWorkListItems,
                featured: fallbackWorkListItems.filter((project) => project.featured),
            }
        }

        return {
            projects,
            featured: projects.filter(p => p.featured),
        }
    } catch (e) {
        console.error('Error fetching works list:', e)
        return {
            projects: fallbackWorkListItems,
            featured: fallbackWorkListItems.filter((project) => project.featured),
        }
    }
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
    try {
        const [result] = await db
            .select()
            .from(works)
            .where(and(eq(works.slug, slug), eq(works.status, 'published')))
            .limit(1)

        return (result as Work) || fallbackWorks.find((work) => work.slug === slug) || null
    } catch (e) {
        console.error('Error fetching work by slug:', e)
        return fallbackWorks.find((work) => work.slug === slug) || null
    }
}

export async function getAllWorkSlugs(): Promise<string[]> {
    try {
        const result = await db
            .select({ slug: works.slug })
            .from(works)
            .where(eq(works.status, 'published'))

        const slugs = result.map(item => item.slug)
        return slugs.length > 0 ? slugs : fallbackWorks.map((work) => work.slug)
    } catch (e) {
        console.error('Error fetching work slugs:', e)
        return fallbackWorks.map((work) => work.slug)
    }
}

export async function getProfile(): Promise<Profile | null> {
    try {
        const [result] = await db
            .select()
            .from(profile)
            .limit(1)

        if (result) return result as Profile
    } catch (e) {
        console.error('Error fetching profile:', e)
    }

    // Return default profile from env vars if table doesn't exist or is empty
    const site = await getSiteConfig()
    return {
        id: 'default',
        name: site.ownerName,
        title: site.ownerTitle,
        bio: 'I design and build systems that ship.',
        profile_image: null,
        location: 'Remote',
        available_for_work: true,
        resume_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
}

export async function getExperiences(): Promise<Experience[]> {
    try {
        const result = await db
            .select()
            .from(experience)
            .orderBy(asc(experience.display_order))

        return result as Experience[]
    } catch (e) {
        console.error('Error fetching experiences:', e)
        return []
    }
}

export async function getSkills(): Promise<SkillsByCategory> {
    try {
        const result = await db
            .select()
            .from(skills)
            .orderBy(asc(skills.display_order))

        const allSkills = result as Skill[]

        return {
            languages: allSkills.filter(s => s.category === 'languages'),
            frameworks: allSkills.filter(s => s.category === 'frameworks'),
            tools: allSkills.filter(s => s.category === 'tools'),
            'soft-skills': allSkills.filter(s => s.category === 'soft-skills'),
            general: allSkills.filter(s => s.category === 'general'),
        }
    } catch (e) {
        console.error('Error fetching skills:', e)
        return {
            languages: [],
            frameworks: [],
            tools: [],
            'soft-skills': [],
            general: [],
        }
    }
}

export async function getEducation(): Promise<Education[]> {
    try {
        const result = await db
            .select()
            .from(education)
            .orderBy(asc(education.display_order))

        return result as Education[]
    } catch (e) {
        console.error('Error fetching education:', e)
        return []
    }
}

export async function getAchievements(): Promise<Achievement[]> {
    try {
        const result = await db
            .select()
            .from(achievements)
            .orderBy(asc(achievements.display_order))

        return result as Achievement[]
    } catch (e) {
        console.error('Error fetching achievements:', e)
        return []
    }
}

export async function getSocialLinks(): Promise<SocialLink[]> {
    try {
        const result = await db
            .select()
            .from(socialLinks)
            .orderBy(asc(socialLinks.display_order))

        return result as SocialLink[]
    } catch (e) {
        // Return defaults from env vars if social_links table doesn't exist
        const site = await getSiteConfig()

        return [
            { id: '1', platform: 'email', url: `mailto:${site.ownerEmail}`, display_name: site.ownerEmail, icon: null, display_order: 1, created_at: '' },
            { id: '2', platform: 'github', url: site.ownerGithub, display_name: 'GitHub', icon: null, display_order: 2, created_at: '' },
            { id: '3', platform: 'linkedin', url: site.ownerLinkedin, display_name: 'LinkedIn', icon: null, display_order: 3, created_at: '' },
        ]
    }
}

// Combined About Page Data
export async function getAboutPageData(): Promise<AboutPageData> {
    const [profileData, experiences, skillsData, educationData, achievementsData, socialLinksData] = await Promise.all([
        getProfile(),
        getExperiences(),
        getSkills(),
        getEducation(),
        getAchievements(),
        getSocialLinks(),
    ])

    return {
        profile: profileData,
        experiences,
        skills: skillsData,
        education: educationData,
        achievements: achievementsData,
        socialLinks: socialLinksData,
    }
}

export async function getSettings(): Promise<Record<string, string>> {
    try {
        const result = await db
            .select({ key: settings.key, value: settings.value })
            .from(settings)

        return result.reduce((acc: Record<string, string>, curr) => ({ ...acc, [curr.key]: curr.value }), {})
    } catch (e) {
        console.error('Error fetching settings:', e)
        return {}
    }
}
