import type { Metadata, Viewport } from "next";
import { Inter, DotGothic16 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ConsoleMessage } from "./console-message";
import { getSiteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const dotMatrix = DotGothic16({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dot-matrix',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  const siteUrl = site.siteUrl;
  const ownerName = site.ownerName;
  const ownerTitle = site.ownerTitle;
  const ownerTwitter = site.ownerTwitter;

  return {
    // Core
    title: {
      default: `${ownerName} — ${ownerTitle}`,
      template: `%s — ${ownerName}`
    },
    description: `${ownerTitle} specializing in systems design, full-stack development, and building products with intention.`,
    keywords: [
      ownerName,
      "Product Engineer",
      "Solutions Engineer",
      "AI Developer",
      "Systems Designer",
      "Portfolio",
      "Next.js",
      "TypeScript",
    ],

    // Authorship
    authors: [{ name: ownerName, url: siteUrl }],
    creator: ownerName,
    publisher: ownerName,

    // Canonical & Alternate
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: '/',
    },

    // Open Graph
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: siteUrl,
      siteName: ownerName,
      title: `${ownerName} — ${ownerTitle}`,
      description: `${ownerTitle} specializing in systems design and building products with intention.`,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${ownerName} — ${ownerTitle}`,
        },
      ],
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: `${ownerName} — ${ownerTitle}`,
      description: `${ownerTitle} specializing in systems design and building products with intention.`,
      images: ['/og-image.jpg'],
      creator: ownerTwitter,
    },

    // Robots & Crawling
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // App & Icons
    applicationName: `${ownerName} Portfolio`,
    category: 'technology',
    classification: 'Portfolio',
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico' },
      ],
      shortcut: '/icon.svg',
      apple: '/icon.svg',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteConfig();
  const themeInitScript = `
    (() => {
      try {
        const savedTheme = localStorage.getItem('portfolio-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme === 'dark' || savedTheme === 'light'
          ? savedTheme
          : (prefersDark ? 'dark' : 'light');
        const root = document.documentElement;
        root.classList.remove('theme-light', 'theme-dark');
        root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
      } catch {}
    })();
  `;

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Your Name',
    url: 'https://example.com',
    image: 'https://example.com/og-image.jpg',
    jobTitle: 'Software Engineer',
    description: 'Software Engineer specializing in systems design, full-stack development, and building products with intention.',
    sameAs: [
      'https://github.com/username',
      'https://linkedin.com/in/username',
    ],
    knowsAbout: ['Product Engineering', 'Systems Design', 'Development', 'TypeScript', 'Next.js'],
  };

  const jsonLdData = {
    ...jsonLd,
    name: site.ownerName,
    url: site.siteUrl,
    image: `${site.siteUrl}/og-image.jpg`,
    jobTitle: site.ownerTitle,
    description: `${site.ownerTitle} specializing in systems design, full-stack development, and building products with intention.`,
    sameAs: [
      site.ownerGithub,
      site.ownerLinkedin,
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${dotMatrix.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <ConsoleMessage
          ownerEmail={site.ownerEmail}
          ownerGithub={site.ownerGithub}
          ownerTitle={site.ownerTitle}
        />
        <Analytics />
      </body>
    </html>
  );
}
