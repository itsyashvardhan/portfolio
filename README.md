# Next.js Portfolio Template

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

A minimal, high-performance portfolio template designed for developers and designers. Built with **Next.js 16**, **Supabase**, and modern web standards. Features a fully functional **Admin Dashboard** for managing content without code changes.

[Features](#-features) • [Getting Started](#-getting-started) • [Deployment](#-deployment) • [Customization](#-customization)

</div>

---

## ✨ Features

### 🎨 Public Interface
- **Modern & Minimalist**: Clean aesthetics with focus on content and typography.
- **Dynamic Content**: Works, Writing (Blog), and About pages powered by Supabase.
- **SEO Optimized**: Automatic sitemap generation, OpenGraph tags, and JSON-LD structured data.
- **Performance First**: Built on Next.js App Router with server components and image optimization.
- **Responsive**: Mobile-first design that adapts seamlessly to all devices.

### 🛡️ Admin Dashboard (`/ssh`)
- **Secure Authentication**: Magic Link login via Supabase Auth.
- **Role-Based Access**: Restricted to whitelisted admin emails.
- **MFA Support**: Optional TOTP (Time-based One-Time Password) for extra security.
- **Content Management System**:
  - **Works**: CRUD operations for projects with draft/published states.
  - **Writing**: Full markdown editor for blog posts.
  - **Profile**: Update bio, experience, skills, and social links instantly.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling**: CSS Modules with Design Tokens
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portfolio-template.git my-portfolio
cd my-portfolio
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in your configuration:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Admin Access
ADMIN_EMAILS=your_email@example.com

# Branding
NEXT_PUBLIC_HERO_NAME=Your Name
NEXT_PUBLIC_HERO_PHONETIC=your-pho-net-ic
NEXT_PUBLIC_HERO_TAGLINE=Your professional tagline.
NEXT_PUBLIC_LOGO_TEXT=LP

# Owner Info (SEO)
NEXT_PUBLIC_OWNER_NAME=Your Name
NEXT_PUBLIC_OWNER_TITLE=Software Engineer
NEXT_PUBLIC_OWNER_EMAIL=hello@example.com
NEXT_PUBLIC_OWNER_GITHUB=https://github.com/yourusername
NEXT_PUBLIC_OWNER_LINKEDIN=https://linkedin.com/in/yourusername
NEXT_PUBLIC_OWNER_TWITTER=@yourhandle
```

### 3. Database Setup

1. Create a new project on [Supabase](https://supabase.com).
2. Go to the SQL Editor in your Supabase dashboard.
3. Run the content of `supabase/schema.sql`.
4. (Optional) Run `supabase/sample-data.sql` to seed initial data.

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to see your new portfolio.

---

## 📦 Deployment

The easiest way to deploy is with Vercel.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add the **Environment Variables** (copy from your `.env.local`).
4. Hit **Deploy**.

> **Note**: Don't forget to update `NEXT_PUBLIC_SITE_URL` to your production domain in the Vercel dashboard.

---

## 🎨 Customization

This template is designed to be "config-first". Most branding can be changed via environment variables.

### changing the Banner
Replace `public/banner.png` with your own 1200x600 branding image.

### Styling
Core styles are defined in `src/app/globals.css` using CSS variables. You can easily update the color palette there.

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --accent: #333333;
  /* ... */
}
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with intention.</sub>
</div>
