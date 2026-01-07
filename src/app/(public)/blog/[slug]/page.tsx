import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/data'
import { MarkdownRenderer } from '@/components/markdown'
import styles from '../page.module.css'
import type { Metadata } from 'next'

// Enable dynamic rendering with ISR
export const dynamicParams = true
export const revalidate = 3600 // Cache for 1 hour

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
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <div className={styles.page}>
            <article className={`container ${styles.article}`}>
                <Link href="/blog" className={styles.back}>← Back to Blog</Link>

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

                {/* Markdown Body */}
                <div className={styles.body}>
                    <MarkdownRenderer content={article.body || ''} />
                </div>
            </article>
        </div>
    )
}
