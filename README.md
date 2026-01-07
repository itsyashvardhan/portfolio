# यशवर्धन — Personal Portfolio

A modern, performant portfolio platform built with Next.js 16, Supabase, and a Jobs-Ive design philosophy. Features a secure admin dashboard for content management without redeployment.

## Features

### Public
- **Landing Page** — Minimal, impactful introduction
- **Works** — Project case studies with problem/constraints/decisions/outcome structure
- **Blog** — Technical writing with tag support
- **About** — Experience timeline and contact information
- **SEO** — Dynamic sitemap, OpenGraph tags, robots.txt

### Admin (`/ssh`)
- **Secure Authentication** — Google OAuth with MFA support
- **Works Management** — Full CRUD with draft/publish workflow
- **Writing Management** — Create and manage blog posts
- **Experience Editor** — Update work history
- **Settings** — Configure site metadata, social links

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Google OAuth + TOTP MFA)
- **Styling**: CSS Modules with design tokens
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase project

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

4. **Set up database**
   
   Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor. This creates:
   - `works`, `Blog`, `experience`, `settings` tables
   - Row Level Security policies
   - Admin email whitelist

5. **Configure Google OAuth in Supabase**
   - Enable Google provider in Supabase Auth settings
   - Add your admin email to the `admin_emails` table

6. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. **Push to GitHub**

2. **Import to Vercel**
   - Connect your repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
     - `NEXT_PUBLIC_SITE_URL`

3. **Configure Supabase**
   - Add your Vercel deployment URL to Supabase Auth redirect URLs
   - Format: `https://yourdomain.com/auth/callback`

4. **Deploy**

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public routes
│   │   ├── about/
│   │   ├── blog/
│   │   └── works/
│   ├── ssh/               # Admin routes (protected)
│   │   ├── (admin)/
│   │   │   ├── experience/
│   │   │   ├── settings/
│   │   │   ├── works/
│   │   │   └── writing/
│   │   └── login/
│   ├── api/               # API routes
│   ├── verify/            # MFA verification
│   ├── globals.css        # Design tokens
│   └── layout.tsx         # Root layout with SEO
├── lib/
│   └── supabase/          # Supabase client setup
└── middleware.ts          # Auth session refresh
```

## Content Management

Access the admin dashboard at `/ssh` after authentication:

- **Works**: Add projects with problem statements, constraints, decisions, and outcomes
- **Writing**: Publish blog posts with excerpts and tags
- **Experience**: Manage work history with highlights
- **Settings**: Update site metadata and social links

## Design Philosophy

This portfolio follows a **Jobs-Ive design bar**:

- Content over chrome
- Clarity over cleverness
- Restraint over features
- Editorial hierarchy
- No gradients, minimal shadows
- Monochrome with single accent

## License

MIT
