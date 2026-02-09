import Link from 'next/link'
import { MarkdownRenderer } from '@/components/markdown'
import styles from '../page.module.css'
import type { Metadata } from 'next'

// Recommended slug: portfolio-design-philosophy
export const metadata: Metadata = {
    title: 'Building a Portfolio That Gets Out of the Way',
    description: 'How I designed and built a minimal portfolio that prioritizes content over chrome, blending Devanagari heritage with modern minimalism.',
}

const ARTICLE = {
    title: 'Building a Portfolio That Gets Out of the Way',
    excerpt: 'Most portfolio sites are monuments to their creators. I wanted mine to be a window.',
    published_at: '2026-01-30',
    read_time: 8,
    body: `
## The 3AM Moment

It was 3AM. I was reviewing the fifteenth portfolio iteration. Gradients everywhere. A hero section with floating 3D shapes. Scroll-triggered animations that would make a PowerPoint cry.

I closed my laptop.

The next morning, I deleted everything and asked myself a question I should have asked on day one: **What is this actually for?**

---

## The Problem

Most developer portfolios are loud. They compete for attention with animations, color schemes, and visual tricks. The homepage becomes a showcase of "look what I can build" instead of "here's what I've actually built."

The irony is painful: a portfolio meant to demonstrate professional credibility often demonstrates the opposite.

I had fallen into the same trap. My early drafts had:
- A 3D animated background
- Parallax scrolling on every section
- Custom cursor trails
- A dark mode toggle with a 400ms transition

None of these helped a recruiter, collaborator, or potential client understand what I do or whether I'm good at it.

---

## The Insight

The best portfolios I'd seen shared one trait: **restraint**.

Stripe's documentation doesn't need gradients. Apple's product pages let whitespace do the heavy lifting. Notion's marketing is effective precisely because it's calm.

The insight wasn't revolutionary, but it was clarifying:

> A portfolio should be a window to your work, not a monument to your taste.

If someone lands on my site, they're there for one of three reasons:
1. To see what I've built
2. To read what I think
3. To contact me

Everything else is noise.

---

## The Cultural Layer

But restraint alone felt cold. I didn't want a portfolio that could belong to anyone.

The solution came from my name itself: **यशवर्धन**.

I rendered my name in Devanagari script on the hero. Not as decoration, but as identity. Most visitors won't read it—but they'll notice it. It signals that this isn't a template. It's mine.

Below the Devanagari, a phonetic pronunciation sits quietly for those who want to say it correctly. A subtle nod to the global reader.

![Devanagari name on the homepage](/blog/hero-devanagari.png)

This became a design principle: **cultural presence without cultural loudness.**

### The Symbol

Instead of a logo, I chose **◈**—a Unicode geometric diamond. It appears throughout: in the navigation, the Works cards, the admin panel. No custom SVG. No brand identity deck. Just a character that carries weight without needing explanation.

The navigation icons follow the same logic:
- **¶** for Blog (the pilcrow, used in typography for paragraphs)
- **◈** for Works (the project marker)
- **@** for About (universal contact symbol)

These symbols work across languages and render consistently everywhere because they're Unicode, not images.

![Navigation using Unicode symbols](/blog/nav-symbols.png)

### The Hidden Layer

Open Developer Tools on the site. Wait two seconds.

You'll see an ASCII-art console message—a quiet hello to the handful of people who inspect pages for fun. It's not visible to users. It doesn't affect performance. But it's a wink to a very specific kind of visitor: the builder.

![Console easter egg for developers](/blog/console-easter-egg.png)

This is what I mean by niche touches. Not easter eggs for engagement metrics—signals for affinity.

---

## The Decisions

I started with a simple design constraint: **Jobs-Ive Bar**—a term I made up to describe the intersection of Jobs' product obsession and Ive's industrial minimalism. Every element had to earn its place.

### What I Built

**Typography-first design.** The entire site uses a single typeface (\`Inter\`) with a strict modular scale (1.618 ratio). No decorative fonts. No font-weight excess. The hierarchy is created through size, spacing, and weight—not color or effects.

**Monochrome + single accent.** Light mode: near-black on near-white. Dark mode: inverted. One accent color for interactive elements. Zero gradients.

**4px spacing system.** Every margin, padding, and gap derives from a 4px base unit. This creates visual rhythm without effort.

**Environment-driven branding.** Name, tagline, and social links are configured via environment variables. No hardcoded personal data in the codebase. Someone forking this can rebrand in minutes—but they'll need to bring their own cultural layer.

### What I Didn't Build

**No homepage project carousel.** Carousels are where attention goes to die. The homepage has three links: Blog, Works, About. That's it.

**No scroll animations.** Content appears. It doesn't fade, slide, or bounce. The only animations are entrance effects on the landing page—subtle opacity and blur-to-sharp reveal.

**No dark mode toggle.** The site respects \`prefers-color-scheme\`. Your system preference is the toggle.

**No comments, reactions, or social widgets.** If someone wants to respond, they can email me.

---

## The Architecture

Under the hood, the portfolio is built to be maintainable by someone who doesn't want to touch code to update content.

### Stack

- **Next.js 15** (App Router) — Server components by default. Pages are rendered at build time with ISR (Incremental Static Regeneration) for freshness.
- **Neon DB** — PostgreSQL for all content. Blog posts, projects, experience, skills, education, achievements, and social links are all database-driven.
- **CSS Modules** — No utility classes. Each component has co-located styles with full access to design tokens defined in \`globals.css\`.
- **Vercel** — Deploy on push. Analytics included.

### Content Architecture

The database schema is designed around five content types:
- \`blog\` — Articles with markdown bodies and read-time estimates
- \`works\` — Projects with problem statements, constraints, decisions, and outcomes
- \`profile\` — Bio, title, location, availability
- \`experience\`, \`education\`, \`achievements\`, \`skills\` — Structured data for the About page
- \`social_links\` — Contact channels

Everything supports \`draft\` and \`published\` states. The admin panel at \`/ssh\` (a nod to secure shell access) handles all CRUD operations with a minimal UI.

### SEO by Default

Every page generates:
- Unique \`<title>\` and \`<meta description>\`
- Open Graph and Twitter Card metadata
- JSON-LD structured data for Person schema
- A dynamic sitemap at \`/sitemap.xml\`

I didn't want to think about SEO after launch, so I baked it into the architecture.

---

## Results

The portfolio has been live for a few weeks. Some early observations:

**Page speed.** Lighthouse scores are consistently 95+ across all categories. No third-party scripts beyond Vercel Analytics.

**Time on site.** Visitors who reach the Works or Blog page stay longer than on my previous portfolio. The lack of distraction seems to help.

**Inbound messages.** Three recruiter emails mentioned "clean design" unprompted. One mentioned the Devanagari name. Take that as you will.

**Maintenance time.** I've updated content entirely via the admin panel. Zero code deploys for content changes.

---

## What I Learned

**Constraint is freedom.** A strict design system (one font, one accent, 4px grid) made every decision faster. When the rules are clear, execution is quick.

**Identity doesn't require loudness.** The Devanagari name, the ◈ symbol, the console message—none of these scream for attention. They're present for those who notice.

**Dark mode for free.** Respecting \`prefers-color-scheme\` via CSS variables eliminated an entire category of bugs and UI decisions. No toggle means no toggle-related edge cases.

**Environment variables for personalization.** Forking a portfolio template usually means a tedious find-and-replace. Moving all branding to \`.env\` makes rebranding trivial.

**Admin panels are worth the investment.** Building the \`/ssh\` dashboard took an extra day. It saved hours of "quickly editing this markdown file" workflows.

---

## What I'd Do Differently

**Start with the admin panel.** I built the public site first and bolted the admin on later. If I started over, I'd build the CMS first and treat the public site as a read-only view layer.

**Mobile navigation earlier.** The fixed bottom nav on mobile was an afterthought. It should have been designed from the start.

**More aggressive caching.** I'm using 1-hour revalidation for most pages. For a personal site with infrequent updates, daily or on-demand revalidation would be fine.

---

## What's Next

The portfolio is stable, but not done:

1. **RSS feed** — For the three people who still use feed readers (myself included).
2. **Project case studies** — Full narrative pages for major projects, not just cards.
3. **A "now" page** — Inspired by Derek Sivers. What I'm currently working on, reading, and thinking about.

---

## Closing Thought

The best interface is the one you don't notice.

I wanted a portfolio that felt like opening a book—not entering a theme park. One that said something about me without saying everything.

Whether I succeeded is for visitors to judge. But for the first time, I'm not embarrassed to share the link.

If you're building your own portfolio, consider what you're actually optimizing for. Chances are, it's not animated gradients. And chances are, the version that feels most like you is the one that requires the most restraint.

---

*Built with Next.js, Neon DB, and a healthy disrespect for trends.*
`
}

export default function BlogPreviewPage() {
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <div className={styles.page}>
            <article className={`container ${styles.article}`}>
                <Link href="/blog" className={styles.back}>← Back to Blog</Link>

                <header className={styles.articleHeader}>
                    <div className={styles.articleMeta}>
                        <span className={styles.date}>
                            {formatDate(ARTICLE.published_at)}
                        </span>
                        <span className={styles.readTime}>{ARTICLE.read_time} min read</span>
                    </div>

                    <h1 className={styles.articleTitle}>{ARTICLE.title}</h1>
                </header>

                {/* Markdown Body */}
                <div className={styles.body}>
                    <MarkdownRenderer content={ARTICLE.body} />
                </div>
            </article>
        </div>
    )
}
