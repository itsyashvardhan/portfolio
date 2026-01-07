// ============================================
// COMPREHENSIVE TYPE DEFINITIONS
// ============================================

// Blog/Article Types
export interface Blog {
    id: string
    slug: string
    title: string
    body: string
    excerpt: string
    banner_image: string | null
    tags: string[]
    read_time: number
    status: 'draft' | 'published'
    seo_title: string | null
    seo_description: string | null
    published_at: string | null
    created_at: string
    updated_at: string
}

export interface BlogListItem {
    slug: string
    title: string
    excerpt: string
    banner_image: string | null
    tags: string[]
    read_time: number
    created_at: string
    published_at: string | null
}

// Works/Projects Types
export interface Work {
    id: string
    slug: string
    title: string
    description: string | null
    problem: string | null
    constraints: string | null
    decisions: string | null
    tech_context: string | null
    outcome: string | null
    body: string | null
    role: string | null
    tech_stack: string[]
    repo_url: string | null
    demo_url: string | null
    demo_label: string | null
    project_status: 'active' | 'archived' | 'in-progress'
    featured: boolean
    status: 'draft' | 'published'
    display_order: number
    created_at: string
    updated_at: string
}

export interface WorkListItem {
    slug: string
    title: string
    description: string | null
    outcome: string | null
    tech_stack: string[]
    repo_url: string | null
    demo_url: string | null
    demo_label: string | null
    project_status: 'active' | 'archived' | 'in-progress'
    featured: boolean
}

// Profile Types
export interface Profile {
    id: string
    name: string
    title: string
    bio: string | null
    profile_image: string | null
    location: string | null
    available_for_work: boolean
    resume_url: string | null
    created_at: string
    updated_at: string
}

// Experience Types
export interface Experience {
    id: string
    organization: string
    role: string
    start_date: string | null
    end_date: string | null
    highlights: string[]
    display_order: number
    created_at: string
}

// Skills Types
export interface Skill {
    id: string
    name: string
    category: 'languages' | 'frameworks' | 'tools' | 'soft-skills' | 'general'
    proficiency: number
    display_order: number
    created_at: string
}

export interface SkillsByCategory {
    languages: Skill[]
    frameworks: Skill[]
    tools: Skill[]
    'soft-skills': Skill[]
    general: Skill[]
}

// Education Types
export interface Education {
    id: string
    institution: string
    degree: string
    field: string | null
    start_date: string | null
    end_date: string | null
    description: string | null
    display_order: number
    created_at: string
}

// Achievement Types
export interface Achievement {
    id: string
    title: string
    description: string | null
    date: string | null
    link: string | null
    icon: string
    display_order: number
    created_at: string
}

// Social Link Types
export interface SocialLink {
    id: string
    platform: string
    url: string
    display_name: string | null
    icon: string | null
    display_order: number
    created_at: string
}

// Settings Types
export interface Settings {
    [key: string]: string
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
    data: T | null
    error: string | null
    status: number
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    hasMore: boolean
}

// About Page Combined Data
export interface AboutPageData {
    profile: Profile | null
    experiences: Experience[]
    skills: SkillsByCategory
    education: Education[]
    achievements: Achievement[]
    socialLinks: SocialLink[]
}

// Blog Page Combined Data
export interface BlogPageData {
    articles: BlogListItem[]
    total: number
    page: number
    limit: number
    hasMore: boolean
}

// Works Page Combined Data
export interface WorksPageData {
    projects: WorkListItem[]
    featured: WorkListItem[]
}
