import Link from 'next/link'
import Image from 'next/image'
import { getBlogList } from '@/lib/data'
import styles from './page.module.css'
import type { Metadata } from 'next'

// Render dynamically — requires DB access
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Thoughts on product engineering, systems design, and building with intention.',
}

interface BlogPageProps {
    searchParams: Promise<{ page?: string; tag?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const params = await searchParams
    const page = parseInt(params.page || '1', 10)
    const tag = params.tag

    const { articles, total, hasMore } = await getBlogList({ page, limit: 10, tag })

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Blog</h1>
                    <p className={styles.description}>
                        Thoughts on product engineering, systems design, and building with intention.
                    </p>
                    {!tag && articles.length > 0 && (
                        <div className={styles.headerMeta}>
                            <span>{total} article{total !== 1 ? 's' : ''}</span>
                        </div>
                    )}
                    {tag && (
                        <div className={styles.filterInfo}>
                            Showing posts tagged: <strong>{tag}</strong>
                            <Link href="/blog" className={styles.clearFilter}>Clear</Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="container">
                {articles.length === 0 ? (
                    <div className={styles.empty}>
                        <div className={styles.emptyIcon}>✎</div>
                        <p>No articles published yet. My thoughts are currently being drafted.</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.grid}>
                            {articles.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/blog/${article.slug}`}
                                    className={styles.card}
                                >
                                    {/* Banner Image */}
                                    {article.banner_image && (
                                        <div className={styles.cardImage}>
                                            <Image
                                                src={article.banner_image}
                                                alt={article.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}

                                    <div className={styles.cardContent}>
                                        {/* Meta */}
                                        <div className={styles.cardMeta}>
                                            <span className={styles.date}>
                                                {formatDate(article.published_at || article.created_at)}
                                            </span>
                                            <span className={styles.readTime}>{article.read_time} min read</span>
                                        </div>

                                        {/* Title */}
                                        <h2 className={styles.cardTitle}>{article.title}</h2>

                                        {/* Excerpt */}
                                        <p className={styles.cardExcerpt}>{article.excerpt}</p>

                                        {/* Tags */}
                                        {article.tags && article.tags.length > 0 && (
                                            <div className={styles.cardTags}>
                                                {article.tags.slice(0, 3).map((t) => (
                                                    <span key={t} className={styles.tag}>{t}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {(page > 1 || hasMore) && (
                            <div className={styles.pagination}>
                                {page > 1 && (
                                    <Link
                                        href={`/blog?page=${page - 1}${tag ? `&tag=${tag}` : ''}`}
                                        className={styles.pageBtn}
                                    >
                                        ← Previous
                                    </Link>
                                )}
                                <span className={styles.pageInfo}>
                                    Page {page} of {Math.ceil(total / 10)}
                                </span>
                                {hasMore && (
                                    <Link
                                        href={`/blog?page=${page + 1}${tag ? `&tag=${tag}` : ''}`}
                                        className={styles.pageBtn}
                                    >
                                        Next →
                                    </Link>
                                )}
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    )
}
