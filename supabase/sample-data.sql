-- ============================================
-- SAMPLE DATA TEMPLATE
-- Run after schema.sql to add your personal data
-- ============================================

-- 1. Profile
-- Update with your own information
UPDATE profile SET
    name = 'Your Name',
    title = 'Your Title',
    bio = 'Your bio description here.',
    location = 'Your Location'
WHERE name = 'Your Name';

-- 2. Social Links
-- Replace with your own social links
DELETE FROM social_links;
INSERT INTO social_links (platform, url, display_name, display_order) VALUES
    ('email', 'mailto:your_email@example.com', 'your_email@example.com', 1),
    ('github', 'https://github.com/yourusername', 'GitHub', 2),
    ('linkedin', 'https://linkedin.com/in/yourusername', 'LinkedIn', 3),
    ('twitter', 'https://twitter.com/yourusername', 'Twitter', 4);

-- 3. Experience
-- Add your work experience
DELETE FROM experience;
INSERT INTO experience (organization, role, start_date, end_date, location, highlights, display_order) VALUES
(
    'Company Name',
    'Your Role',
    '2024-01-01',
    NULL, -- NULL for current position
    'Location',
    ARRAY[
        'Achievement or responsibility 1',
        'Achievement or responsibility 2'
    ],
    1
);

-- 4. Education
DELETE FROM education;
INSERT INTO education (institution, degree, field, start_date, end_date, description, display_order) VALUES
(
    'University Name',
    'Degree Type',
    'Field of Study',
    '2020-08-01',
    '2024-05-31',
    'Optional description or GPA',
    1
);

-- 5. Skills
-- Add your skills by category: 'languages', 'frameworks', 'tools', 'general'
DELETE FROM skills;
INSERT INTO skills (name, category, proficiency, display_order) VALUES
('Python', 'languages', 90, 1),
('JavaScript', 'languages', 85, 2),
('React', 'frameworks', 90, 1),
('Next.js', 'frameworks', 85, 2),
('Docker', 'tools', 80, 1),
('AWS', 'tools', 75, 2);

-- 6. Works/Projects
-- Add your projects
DELETE FROM works;
INSERT INTO works (slug, title, description, tech_stack, project_status, featured, status, body) VALUES
(
    'project-slug',
    'Project Title',
    'Short description of the project.',
    ARRAY['Tech1', 'Tech2', 'Tech3'],
    'active', -- or 'archived', 'in-progress'
    true, -- featured on homepage
    'published', -- or 'draft'
    '# Project Details

Full markdown description of your project.'
);

-- 7. Achievements/Certifications
DELETE FROM achievements;
INSERT INTO achievements (title, description, date, link, icon, display_order) VALUES
('Achievement Title', 'Description', '2024-01-01', 'https://link-to-proof.com', '🏆', 1);

-- 8. Admin Email
-- Replace with your admin email for SSH panel access
INSERT INTO admin_emails (email) VALUES ('your_admin_email@example.com') ON CONFLICT DO NOTHING;
