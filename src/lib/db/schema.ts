import {
    pgTable,
    uuid,
    text,
    integer,
    boolean,
    timestamp,
    date,
    index,
} from 'drizzle-orm/pg-core'

export const blog = pgTable('blog', {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').unique().notNull(),
    title: text('title').notNull(),
    body: text('body'),
    excerpt: text('excerpt'),
    banner_image: text('banner_image'),
    tags: text('tags').array().default([]),
    read_time: integer('read_time').default(5),
    status: text('status').default('draft'),
    seo_title: text('seo_title'),
    seo_description: text('seo_description'),
    published_at: timestamp('published_at', { withTimezone: true, mode: 'string' }),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
    index('idx_blog_published_at').on(table.published_at),
])

export const works = pgTable('works', {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').unique().notNull(),
    title: text('title').notNull(),
    description: text('description'),
    problem: text('problem'),
    constraints: text('constraints'),
    decisions: text('decisions'),
    tech_context: text('tech_context'),
    outcome: text('outcome'),
    role: text('role'),
    tech_stack: text('tech_stack').array().default([]),
    repo_url: text('repo_url'),
    demo_url: text('demo_url'),
    demo_label: text('demo_label'),
    project_status: text('project_status').default('active'),
    featured: boolean('featured').default(false),
    status: text('status').default('draft'),
    body: text('body'),
    display_order: integer('display_order').default(0),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
    index('idx_works_display_order').on(table.display_order),
])

export const experience = pgTable('experience', {
    id: uuid('id').primaryKey().defaultRandom(),
    organization: text('organization').notNull(),
    role: text('role').notNull(),
    start_date: date('start_date'),
    end_date: date('end_date'),
    location: text('location'),
    highlights: text('highlights').array().default([]),
    display_order: integer('display_order').default(0),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
    index('idx_experience_display_order').on(table.display_order),
])

export const profile = pgTable('profile', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().default('Your Name'),
    title: text('title').default('Software Engineer'),
    bio: text('bio'),
    profile_image: text('profile_image'),
    location: text('location').default('Remote'),
    available_for_work: boolean('available_for_work').default(true),
    resume_url: text('resume_url'),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true, mode: 'string' }).defaultNow(),
})

export const skills = pgTable('skills', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    category: text('category').default('general'),
    proficiency: integer('proficiency').default(80),
    display_order: integer('display_order').default(0),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
    index('idx_skills_category').on(table.category),
])

export const education = pgTable('education', {
    id: uuid('id').primaryKey().defaultRandom(),
    institution: text('institution').notNull(),
    degree: text('degree').notNull(),
    field: text('field'),
    start_date: date('start_date'),
    end_date: date('end_date'),
    description: text('description'),
    display_order: integer('display_order').default(0),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
    index('idx_education_display_order').on(table.display_order),
])

export const achievements = pgTable('achievements', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    description: text('description'),
    date: date('date'),
    link: text('link'),
    icon: text('icon').default('🏆'),
    display_order: integer('display_order').default(0),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
    index('idx_achievements_display_order').on(table.display_order),
])

export const socialLinks = pgTable('social_links', {
    id: uuid('id').primaryKey().defaultRandom(),
    platform: text('platform').notNull(),
    url: text('url').notNull(),
    display_name: text('display_name'),
    icon: text('icon'),
    display_order: integer('display_order').default(0),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
})

export const adminUsers = pgTable('admin_users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').unique().notNull(),
    password_hash: text('password_hash').notNull(),
    totp_secret: text('totp_secret'),
    totp_enabled: boolean('totp_enabled').default(false),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
})

export const settings = pgTable('settings', {
    id: uuid('id').primaryKey().defaultRandom(),
    key: text('key').unique().notNull(),
    value: text('value').notNull().default(''),
    description: text('description'),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
})
