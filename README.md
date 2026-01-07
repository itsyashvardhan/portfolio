# Portfolio Template

A modern, performant portfolio template built with Next.js 16, Supabase, and Vercel Analytics. Features a secure admin dashboard for content management without redeployment.

**Fully configurable via environment variables** — no code changes needed for personalization.

## ✨ Features

### Public Site
- **Landing Page** — Minimal, impactful introduction with customizable branding
- **Works** — Project case studies with problem/constraints/decisions/outcome structure
- **Blog** — Technical writing with tag support and markdown rendering
- **About** — Experience timeline, skills, education, and contact information
- **SEO Optimized** — Dynamic sitemap, OpenGraph tags, JSON-LD, robots.txt

### Admin Panel (`/ssh`)
- **Magic Link Auth** — Secure email-based authentication
- **MFA Support** — Optional TOTP two-factor authentication
- **Works Management** — Full CRUD with draft/publish workflow
- **Writing Management** — Create and manage blog posts
- **Profile & Experience** — Update your bio and work history
- **Settings** — Configure site metadata and social links

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Magic Link + TOTP MFA)
- **Styling**: CSS Modules with design tokens
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/itsyashvardhan/portfolio.git my-portfolio
cd my-portfolio
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your details:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Personal Info (for SEO & metadata)
NEXT_PUBLIC_OWNER_NAME=Your Name
NEXT_PUBLIC_OWNER_TITLE=Your Title
NEXT_PUBLIC_OWNER_EMAIL=your@email.com
NEXT_PUBLIC_OWNER_GITHUB=https://github.com/username
NEXT_PUBLIC_OWNER_LINKEDIN=https://linkedin.com/in/username
NEXT_PUBLIC_OWNER_TWITTER=@username

# Landing Page Branding
NEXT_PUBLIC_HERO_NAME=Your Name
NEXT_PUBLIC_HERO_PHONETIC=
NEXT_PUBLIC_HERO_TAGLINE=Your tagline here.
NEXT_PUBLIC_LOGO_TEXT=◈

# Admin
ADMIN_EMAILS=your@email.com
```

### 3. Set Up Database

1. Create a [Supabase](https://supabase.com) project
2. Go to SQL Editor and run `supabase/schema.sql`
3. Add your email to the `admin_emails` table:
   ```sql
   INSERT INTO admin_emails (email) VALUES ('your@email.com');
   ```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel

1. Push to GitHub
2. Import to [Vercel](https://vercel.com/new)
3. Add all environment variables from `.env.local`
4. In Supabase, add redirect URL: `https://yourdomain.com/auth/callback`
5. Deploy!

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/          # Public routes (works, blog, about)
│   ├── ssh/               # Admin panel (protected)
│   │   ├── (admin)/       # Dashboard, works, writing, settings
│   │   └── login/         # Magic link login
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout with SEO
├── components/            # Shared components
├── lib/
│   ├── data.ts            # Data fetching utilities
│   ├── supabase/          # Supabase client setup
│   └── types.ts           # TypeScript definitions
└── middleware.ts          # Auth session refresh

supabase/
├── schema.sql             # Database schema
├── sample-data.sql        # Template for your data
└── migrations/            # Schema migrations
```

## 🎨 Customization

### Branding
All branding is controlled via environment variables:
- `NEXT_PUBLIC_HERO_NAME` — Large name on landing page
- `NEXT_PUBLIC_LOGO_TEXT` — Logo in navigation (supports Devanagari, emoji, etc.)
- `NEXT_PUBLIC_HERO_TAGLINE` — Tagline on landing page

### Styling
Design tokens are in `src/app/globals.css`. The template uses:
- CSS Variables for theming
- Dark mode support (automatic)
- Monochrome palette with accent colors

### OG Image
Replace `public/og-image.png` with your own 1200x630 image.

## 📝 Content Management

Access the admin dashboard at `/ssh`:

1. Click "Send Magic Link" to receive login email
2. Manage your content:
   - **Works** — Projects with case study structure
   - **Writing** — Blog posts with markdown
   - **Profile** — Bio, title, location
   - **Experience** — Work history
   - **Skills** — Categorized skill list
   - **Settings** — Site metadata

## 🔒 Security

- Admin access controlled via `admin_emails` table
- Row Level Security (RLS) on all tables
- Optional MFA with TOTP authenticator apps
- Magic link authentication (no passwords)

## 📄 License

MIT — feel free to use this template for your own portfolio!

---

Built with ❤️ using Next.js, Supabase, and Vercel.
