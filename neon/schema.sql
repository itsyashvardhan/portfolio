-- Neon DB (PostgreSQL 17) Full Portfolio Schema
-- Run this in your Neon SQL Editor or via psql

-- ============================================
-- 0. UTILITIES
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 1. BLOG SYSTEM
-- ============================================

CREATE TABLE IF NOT EXISTS blog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    excerpt TEXT,
    banner_image TEXT,
    tags TEXT[] DEFAULT '{}',
    read_time INTEGER DEFAULT 5,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    seo_title TEXT,
    seo_description TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. WORKS/PROJECTS
-- ============================================

CREATE TABLE IF NOT EXISTS works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    problem TEXT,
    constraints TEXT,
    decisions TEXT,
    tech_context TEXT,
    outcome TEXT,
    role TEXT,
    tech_stack TEXT[] DEFAULT '{}',
    repo_url TEXT,
    demo_url TEXT,
    demo_label TEXT,
    project_status TEXT DEFAULT 'active' CHECK (project_status IN ('active', 'archived', 'in-progress')),
    featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    body TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. PROFESSIONAL EXPERIENCE
-- ============================================

CREATE TABLE IF NOT EXISTS experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization TEXT NOT NULL,
    role TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    location TEXT,
    highlights TEXT[] DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. ABOUT ME SYSTEM
-- ============================================

CREATE TABLE IF NOT EXISTS profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Your Name',
    title TEXT DEFAULT 'Software Engineer',
    bio TEXT,
    profile_image TEXT,
    location TEXT DEFAULT 'Remote',
    available_for_work BOOLEAN DEFAULT true,
    resume_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTE: Update this with your own information after setup
INSERT INTO profile (name, title, bio, location, available_for_work)
VALUES (
    'Your Name',
    'Software Engineer',
    'I design and build systems that ship.',
    'Remote',
    true
) ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    proficiency INTEGER DEFAULT 80 CHECK (proficiency >= 0 AND proficiency <= 100),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field TEXT,
    start_date DATE,
    end_date DATE,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE,
    link TEXT,
    icon TEXT DEFAULT '🏆',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    display_name TEXT,
    icon TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTE: Update these with your own social links after setup
INSERT INTO social_links (platform, url, display_name, display_order) VALUES
    ('email', 'mailto:your_email@example.com', 'your_email@example.com', 1),
    ('github', 'https://github.com/yourusername', 'GitHub', 2),
    ('linkedin', 'https://linkedin.com/in/yourusername', 'LinkedIn', 3),
    ('twitter', 'https://twitter.com/yourusername', 'Twitter', 4)
ON CONFLICT DO NOTHING;

-- ============================================
-- 5. ADMIN USERS
-- ============================================

CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    totp_secret TEXT,
    totp_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- To create an admin user, run:
-- INSERT INTO admin_users (email, password_hash)
-- VALUES ('your-email@example.com', '<bcrypt-hash>');
-- Generate a bcrypt hash with: npx bcryptjs hash "your-password"

-- ============================================
-- 6. SETTINGS
-- ============================================

CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL DEFAULT '',
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_blog_published_at ON blog(published_at);
CREATE INDEX IF NOT EXISTS idx_works_display_order ON works(display_order);
CREATE INDEX IF NOT EXISTS idx_experience_display_order ON experience(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_education_display_order ON education(display_order);
CREATE INDEX IF NOT EXISTS idx_achievements_display_order ON achievements(display_order);

-- ============================================
-- 8. TRIGGERS
-- ============================================

DROP TRIGGER IF EXISTS update_blog_updated_at ON blog;
CREATE TRIGGER update_blog_updated_at BEFORE UPDATE ON blog FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_works_updated_at ON works;
CREATE TRIGGER update_works_updated_at BEFORE UPDATE ON works FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_profile_updated_at ON profile;
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile FOR EACH ROW EXECUTE FUNCTION update_updated_at();
