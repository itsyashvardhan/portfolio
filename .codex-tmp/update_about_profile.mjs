import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

const bio = 'Final-year IT undergraduate at KIIT University. I work at the intersection of data, systems, and customer-facing problem solving. I build tools that automate real workflows and present analysis that drives decisions, not just dashboards that look good.'
const aboutIntro = 'Open to Data Analyst and Data & AI roles across Asia and Europe. Available from mid-2026.'
const emailDisplay = 'hi@yashvardhan.is-a.dev'
const profileName = 'Yashvardhan'
const profileTitle = 'Analyst | Data and AI'
const profileLocation = 'New Delhi, India · Open to relocation & Remote'

const skills = [
  // languages
  { name: 'SQL', category: 'languages' },
  { name: 'Python', category: 'languages' },
  { name: 'Bash', category: 'languages' },

  // analytics
  { name: 'Power BI', category: 'analytics' },
  { name: 'Excel', category: 'analytics' },
  { name: 'Matplotlib', category: 'analytics' },

  // databases
  { name: 'MySQL', category: 'databases' },
  { name: 'SQLite', category: 'databases' },
  { name: 'Redis', category: 'databases' },

  // devops
  { name: 'Docker', category: 'devops' },
  { name: 'Git', category: 'devops' },
  { name: 'GitHub Actions', category: 'devops' },

  // cloud
  { name: 'AWS', category: 'cloud' },
  { name: 'Vercel', category: 'cloud' },
  { name: 'Cloudflare', category: 'cloud' },

  // general
  { name: 'REST APIs', category: 'general' },
  { name: 'Postman', category: 'general' },
  { name: 'ETL Pipelines', category: 'general' },
  { name: 'Data Modelling', category: 'general' },
  { name: 'MCP Servers', category: 'general' },
]

const existingProfile = await sql`select id from profile limit 1`
if (existingProfile[0]?.id) {
  await sql`
    update profile
    set name = ${profileName},
        title = ${profileTitle},
        bio = ${bio},
        location = ${profileLocation},
        available_for_work = ${true},
        updated_at = now()
    where id = ${existingProfile[0].id}
  `
} else {
  await sql`
    insert into profile (name, title, bio, location, available_for_work, resume_url)
    values (${profileName}, ${profileTitle}, ${bio}, ${profileLocation}, ${true}, ${null})
  `
}

await sql`delete from skills`
for (const [displayOrder, skill] of skills.entries()) {
  await sql`
    insert into skills (name, category, proficiency, display_order)
    values (${skill.name}, ${skill.category}, ${85}, ${displayOrder})
  `
}

await sql`
  update social_links
  set url = ${'mailto:yashvardhan.tech@gmail.com'},
      display_name = ${emailDisplay}
  where platform = ${'email'}
`

await sql`
  insert into social_links (platform, url, display_name, display_order)
  select ${'email'}, ${'mailto:yashvardhan.tech@gmail.com'}, ${emailDisplay}, ${1}
  where not exists (
    select 1 from social_links where platform = ${'email'}
  )
`

for (const entry of [
  ['owner_name', profileName, 'Site owner name'],
  ['owner_title', profileTitle, 'Primary title'],
  ['owner_email', 'yashvardhan.tech@gmail.com', 'Contact email address'],
  ['about_intro', aboutIntro, 'Introduction paragraph on About page'],
  ['about_bio', bio, 'Full biography on About page'],
]) {
  const [key, value, description] = entry
  await sql`
    insert into settings (key, value, description)
    values (${key}, ${value}, ${description})
    on conflict (key) do update
    set value = excluded.value,
        description = excluded.description
  `
}

const [profile, savedSkills, socials] = await Promise.all([
  sql.query('select name, title, location, available_for_work from profile limit 1'),
  sql.query('select name, category, display_order from skills order by display_order'),
  sql.query('select platform, url, display_name, display_order from social_links order by display_order'),
])

console.log(JSON.stringify({ profile, savedSkills, socials }, null, 2))
