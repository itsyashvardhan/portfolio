import type { Metadata, Viewport } from "next";
import { Inter, DotGothic16 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ConsoleMessage } from "./console-message";
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

// Environment variables for personal info
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const ownerName = process.env.NEXT_PUBLIC_OWNER_NAME || 'Your Name';
const ownerTitle = process.env.NEXT_PUBLIC_OWNER_TITLE || 'Software Engineer';
const ownerEmail = process.env.NEXT_PUBLIC_OWNER_EMAIL || 'email@example.com';
const ownerGithub = process.env.NEXT_PUBLIC_OWNER_GITHUB || 'https://github.com/username';
const ownerLinkedin = process.env.NEXT_PUBLIC_OWNER_LINKEDIN || 'https://linkedin.com/in/username';
const ownerTwitter = process.env.NEXT_PUBLIC_OWNER_TWITTER || '@username';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export const metadata: Metadata = {
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
        url: '/og-image.png',
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
    images: ['/og-image.png'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: ownerName,
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    jobTitle: ownerTitle,
    description: `${ownerTitle} specializing in systems design, full-stack development, and building products with intention.`,
    sameAs: [
      ownerGithub,
      ownerLinkedin,
    ],
    knowsAbout: ['Product Engineering', 'Systems Design', 'Development', 'TypeScript', 'Next.js'],
  };

  return (
    <html lang="en" className={`${inter.variable} ${dotMatrix.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to Supabase for faster data fetching */}
        {supabaseUrl && (
          <>
            <link rel="preconnect" href={supabaseUrl} />
            <link rel="dns-prefetch" href={supabaseUrl} />
          </>
        )}
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <ConsoleMessage />
        <Analytics />
      </body>
    </html>
  );
}
