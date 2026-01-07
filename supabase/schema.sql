-- Supabase Full Portfolio Schema Migration
-- Standardized for lowercase table names
-- Run this in your Supabase SQL Editor

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
-- 4. ADMIN & SECURITY
-- ============================================

CREATE TABLE IF NOT EXISTS admin_emails (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: Users must manually insert their email into admin_emails table via SQL
-- INSERT INTO admin_emails (email) VALUES ('your-email@example.com');

-- Enable RLS
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_emails ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
DROP POLICY IF EXISTS "Public can read blog" ON blog;
CREATE POLICY "Public can read blog" ON blog FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Public can read works" ON works;
CREATE POLICY "Public can read works" ON works FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Public can read profile" ON profile;
CREATE POLICY "Public can read profile" ON profile FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read experience" ON experience;
CREATE POLICY "Public can read experience" ON experience FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read skills" ON skills;
CREATE POLICY "Public can read skills" ON skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read education" ON education;
CREATE POLICY "Public can read education" ON education FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read achievements" ON achievements;
CREATE POLICY "Public can read achievements" ON achievements FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read social_links" ON social_links;
CREATE POLICY "Public can read social_links" ON social_links FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read admin_emails" ON admin_emails;
CREATE POLICY "Public read admin_emails" ON admin_emails FOR SELECT USING (true);

-- Admin Manage Policies
DROP POLICY IF EXISTS "Admin manage all blog" ON blog;
CREATE POLICY "Admin manage all blog" ON blog FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_emails));

DROP POLICY IF EXISTS "Admin manage all works" ON works;
CREATE POLICY "Admin manage all works" ON works FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_emails));

DROP POLICY IF EXISTS "Admin manage profile" ON profile;
CREATE POLICY "Admin manage profile" ON profile FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_emails));

DROP POLICY IF EXISTS "Admin manage experience" ON experience;
CREATE POLICY "Admin manage experience" ON experience FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_emails));

DROP POLICY IF EXISTS "Admin manage skills" ON skills;
CREATE POLICY "Admin manage skills" ON skills FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_emails));

DROP POLICY IF EXISTS "Admin manage education" ON education;
CREATE POLICY "Admin manage education" ON education FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_emails));

DROP POLICY IF EXISTS "Admin manage achievements" ON achievements;
CREATE POLICY "Admin manage achievements" ON achievements FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_emails));

DROP POLICY IF EXISTS "Admin manage social_links" ON social_links;
CREATE POLICY "Admin manage social_links" ON social_links FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_emails));

-- ============================================
-- 5. INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_blog_published_at ON blog(published_at);
CREATE INDEX IF NOT EXISTS idx_works_display_order ON works(display_order);
CREATE INDEX IF NOT EXISTS idx_experience_display_order ON experience(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_education_display_order ON education(display_order);
CREATE INDEX IF NOT EXISTS idx_achievements_display_order ON achievements(display_order);

-- ============================================
-- 6. TRIGGERS
-- ============================================

CREATE TRIGGER update_blog_updated_at BEFORE UPDATE ON blog FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_works_updated_at BEFORE UPDATE ON works FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile FOR EACH ROW EXECUTE FUNCTION update_updated_at();
