import type { Metadata, Viewport } from "next";
import { Inter, DotGothic16 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ConsoleMessage } from "./console-message";
import { getStaticSiteConfig } from "@/lib/site-config";
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

export function generateMetadata(): Metadata {
  const site = getStaticSiteConfig();
  const siteUrl = site.siteUrl;
  const ownerName = site.ownerName;
  const ownerTitle = site.ownerTitle;
  const ownerTwitter = site.ownerTwitter;

  return {
    // Core
    title: {
      default: 'Yashvardhan Singh — AI & Data Systems Engineer',
      template: '%s | Yashvardhan Singh',
    },
    description: 'AI & Data Systems Engineer building edge ML systems and LLM infrastructure. Published at ICCCN 2026. New Delhi, India.',
    keywords: [
      'AI engineer',
      'edge ML',
      'LLM infrastructure',
      'data pipelines',
      'Yashvardhan Singh',
      'ICCCN 2026',
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
      description: 'AI & Data Systems Engineer building edge ML systems and LLM infrastructure. Published at ICCCN 2026. New Delhi, India.',
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
      description: 'AI & Data Systems Engineer building edge ML systems and LLM infrastructure. Published at ICCCN 2026.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getStaticSiteConfig();
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

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.ownerName,
    url: site.siteUrl,
    image: `${site.siteUrl}/og-image.jpg`,
    jobTitle: site.ownerTitle,
    description: 'AI & Data Systems Engineer specialising in edge ML inference and LLM infrastructure. Published at ICCCN 2026 on vision encoder optimisation for edge VLLMs. Built production Kafka pipelines at Medikabazaar.',
    sameAs: [
      site.ownerGithub,
      site.ownerLinkedin,
    ],
    knowsAbout: ['Edge ML Inference', 'LLM Infrastructure', 'Data Pipelines', 'Kafka', 'TensorRT', 'TFLite', 'Python', 'AWS', 'LangChain', 'MCP Server'],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'KIIT University',
      address: { '@type': 'PostalAddress', addressLocality: 'Bhubaneswar', addressCountry: 'IN' },
    },
    address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
  };

  return (
    <html lang="en" className={`${inter.variable} ${dotMatrix.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://diagflo.yashvardhan.dev" />
        <link rel="dns-prefetch" href="https://getcred.yashvardhan.dev" />
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
