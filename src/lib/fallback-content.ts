import type { Blog, BlogListItem, Work, WorkListItem } from '@/lib/types'

const now = new Date().toISOString()

export const fallbackBlogPosts: Blog[] = [
    {
        id: 'fallback-blog-1',
        slug: 'shipping-with-intent',
        title: 'Shipping With Intent',
        body: `Most products do not fail because of lack of ideas.

They fail because execution drifts from the user problem. The fix is simple:

- Define one clear user outcome
- Cut features that do not improve that outcome
- Ship in small loops with real feedback

This portfolio is built with the same principle: small, focused systems that are easy to maintain.`,
        excerpt: 'How to ship faster without losing quality by narrowing scope to clear user outcomes.',
        banner_image: '/blog/hero-devanagari.png',
        tags: ['product', 'engineering', 'execution'],
        read_time: 4,
        status: 'published',
        seo_title: null,
        seo_description: null,
        published_at: '2026-01-10T00:00:00.000Z',
        created_at: now,
        updated_at: now,
    },
]

export const fallbackBlogListItems: BlogListItem[] = fallbackBlogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    banner_image: post.banner_image,
    tags: post.tags,
    read_time: post.read_time,
    created_at: post.created_at,
    published_at: post.published_at,
}))

export const fallbackWorks: Work[] = [
    // {
    //     id: 'fallback-work-1',
    //     slug: 'diagflo',
    //     title: 'Diagflo',
    //     description: 'AI-powered diagram and flow workspace for converting ideas into clear visual systems.',
    //     problem: null,
    //     constraints: null,
    //     decisions: null,
    //     tech_context: null,
    //     outcome: 'Built and launched a production deployment with an integrated collaboration flow.',
    //     body: null,
    //     role: 'Builder',
    //     tech_stack: ['Next.js', 'TypeScript'],
    //     repo_url: 'https://github.com/itsyashvardhan/diagflo',
    //     demo_url: 'https://diagflo.yashvardhan.dev',
    //     demo_label: 'Live',
    //     project_status: 'active',
    //     featured: true,
    //     status: 'published',
    //     display_order: 2,
    //     created_at: now,
    //     updated_at: now,
    // },
]

export const fallbackWorkListItems: WorkListItem[] = fallbackWorks.map((work) => ({
    slug: work.slug,
    title: work.title,
    description: work.description,
    outcome: work.outcome,
    tech_stack: work.tech_stack,
    repo_url: work.repo_url,
    demo_url: work.demo_url,
    demo_label: work.demo_label,
    project_status: work.project_status,
    featured: work.featured,
}))
