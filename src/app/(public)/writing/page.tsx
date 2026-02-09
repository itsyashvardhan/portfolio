import Link from 'next/link'
import { getBlogList } from '@/lib/data'
import styles from './page.module.css'

// Render dynamically — requires DB access
export const dynamic = 'force-dynamic'

export default async function WritingPage() {
    const { articles } = await getBlogList()

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }

    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Blog</h1>
                    <p className={styles.description}>
                        Thoughts on product engineering, systems design, and building with intention.
                    </p>
                </div>
            </section>

            <section className="container">
                <div className={styles.list}>
                    {articles?.length === 0 ? (
                        <p style={{ color: 'var(--color-text-secondary)' }}>No articles published yet.</p>
                    ) : (
                        articles?.map((article) => (
                            <Link key={article.slug} href={`/blog/${article.slug}`} className={styles.item}>
                                <div className={styles.meta}>
                                    <span className={styles.date}>{formatDate(article.created_at)}</span>
                                    <div className={styles.tags}>
                                        {article.tags?.map((tag: string) => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <h2 className={styles.itemTitle}>{article.title}</h2>
                                <p className={styles.excerpt}>{article.excerpt}</p>
                            </Link>
                        ))
                    )}
                </div>
            </section>
        </div>
    )
}
