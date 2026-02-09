# Next.js Portfolio Template

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Neon DB](https://img.shields.io/badge/Neon-PostgreSQL_17-00e599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

A minimal, high-performance portfolio template designed for developers and designers. Built with **Next.js 16**, **Neon DB** (PostgreSQL 17), and modern web standards. Features a fully functional **Admin Dashboard** for managing content without code changes.

[Features](#-features) • [Getting Started](#-getting-started) • [Deployment](#-deployment) • [Customization](#-customization)

</div>

---

## ✨ Features

### 🎨 Public Interface
- **Modern & Minimalist**: Clean aesthetics with focus on content and typography.
- **Dynamic Content**: Works, Writing (Blog), and About pages powered by Neon DB.
- **SEO Optimized**: Automatic sitemap generation, OpenGraph tags, and JSON-LD structured data.
- **Performance First**: Built on Next.js App Router with server components and image optimization.
- **Responsive**: Mobile-first design that adapts seamlessly to all devices.

### 🛡️ Admin Dashboard (`/ssh`)
- **Secure Authentication**: Email + password login with JWT sessions.
- **MFA Support**: Optional TOTP (Time-based One-Time Password) for extra security.
- **Content Management System**:
  - **Works**: CRUD operations for projects with draft/published states.
  - **Writing**: Full markdown editor for blog posts.
  - **Profile**: Update bio, experience, skills, and social links instantly.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Database**: [Neon DB](https://neon.tech/) (PostgreSQL 17) with [Drizzle ORM](https://orm.drizzle.team/)
- **Auth**: JWT sessions (jose) + bcrypt passwords + TOTP MFA
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
# Neon DB — get your connection string from https://console.neon.tech
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require

# JWT secret — generate with: openssl rand -base64 32
JWT_SECRET=your-random-secret-here

NEXT_PUBLIC_SITE_URL=http://localhost:3000

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

1. Create a project on [Neon](https://console.neon.tech) (PostgreSQL 17).
2. Copy your connection string into `DATABASE_URL` in `.env.local`.
3. Push the schema: `npm run db:push`
4. Create your admin user (see `.env.example` for instructions).

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
