import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/data'
import { MarkdownRenderer } from '@/components/markdown'
import { AudioPlayer } from '@/components/audio-player'
import styles from '../page.module.css'
import type { Metadata } from 'next'

// Enable dynamic rendering
export const dynamicParams = true
export const dynamic = 'force-dynamic'

// Generate metadata
export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const article = await getBlogBySlug(slug)

    if (!article) {
        return { title: 'Article Not Found' }
    }

    return {
        title: article.seo_title || article.title,
        description: article.seo_description || article.excerpt,
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
            // Allow AI crawlers to index metadata but not train on body content
            nocache: false,
        },
        other: {
            'ai-content-policy': 'metadata-only',
        },
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: 'article',
            publishedTime: article.published_at || article.created_at,
            images: article.banner_image ? [article.banner_image] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: article.banner_image ? [article.banner_image] : undefined,
        },
    }
}

export default async function BlogDetailPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const article = await getBlogBySlug(slug)

    if (!article) {
        notFound()
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        })
    }

    return (
        <div className={styles.page}>
            <article className={`container ${styles.article}`}>
                <Link href="/blog" className={styles.back}>Back to Blog</Link>

                {/* Banner Image */}
                {article.banner_image && (
                    <div className={styles.articleBanner}>
                        <Image
                            src={article.banner_image}
                            alt={article.title}
                            fill
                            priority
                            sizes="(max-width: 1200px) 100vw, 720px"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                )}

                <header className={styles.articleHeader}>
                    <div className={styles.articleMeta}>
                        <span className={styles.date}>
                            {formatDate(article.published_at || article.created_at)}
                        </span>
                        <span className={styles.readTime}>{article.read_time} min read</span>
                    </div>

                    <h1 className={styles.articleTitle}>{article.title}</h1>

                    {article.tags && article.tags.length > 0 && (
                        <div className={styles.tags}>
                            {article.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className={styles.tag}
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}
                </header>

                {/* Audio Version — only render if TTS is configured */}
                {(process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.ELEVENLABS_API_KEY) && (
                    <AudioPlayer slug={slug} title={article.title} />
                )}

                {/* Markdown Body */}
                <div className={styles.body}>
                    <MarkdownRenderer content={article.body || ''} />
                </div>

                {/* Contact */}
                <div style={{
                    marginTop: '64px',
                    paddingTop: '32px',
                    borderTop: '1px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                        Thoughts, questions, or want to collaborate?
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <a
                            href={`mailto:${process.env.NEXT_PUBLIC_OWNER_EMAIL || 'mail@yashvardhan.dev'}`}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--color-text)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                padding: '8px 16px',
                                textDecoration: 'none',
                                transition: 'border-color var(--transition-fast)',
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
                            </svg>
                            Mail
                        </a>
                        <a
                            href="https://linkedin.com/in/yashvardhan"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--color-text)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                padding: '8px 16px',
                                textDecoration: 'none',
                                transition: 'border-color var(--transition-fast)',
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                            </svg>
                            LinkedIn
                        </a>
                    </div>
                </div>
            </article>
        </div>
    )
}
