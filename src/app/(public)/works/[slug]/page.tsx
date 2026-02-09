import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getWorkBySlug } from '@/lib/data'
import { MarkdownRenderer } from '@/components/markdown'
import styles from '../page.module.css'
import type { Metadata } from 'next'

// Enable dynamic rendering
export const dynamicParams = true
export const dynamic = 'force-dynamic'

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const work = await getWorkBySlug(slug)

    if (!work) return { title: 'Work Not Found' }

    return {
        title: work.title,
        description: work.description || work.problem || 'Project details',
        openGraph: {
            title: work.title,
            description: work.description || work.problem || 'Project details',
        },
    }
}

export default async function WorkDetailPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const work = await getWorkBySlug(slug)

    if (!work) {
        notFound()
    }

    const getStatusBadge = (status: string) => {
        const badges: Record<string, { label: string; className: string }> = {
            'active': { label: 'Active', className: styles.statusActive },
            'archived': { label: 'Archived', className: styles.statusArchived },
            'in-progress': { label: 'In Progress', className: styles.statusProgress },
        }
        return badges[status] || badges['active']
    }

    const badge = getStatusBadge(work.project_status)

    return (
        <div className={styles.page}>
            <article className={`container ${styles.projectDetail}`}>
                <Link href="/works" className={styles.back}>Back to Works</Link>

                <header className={styles.projectHeader}>
                    <h1 className={styles.projectTitle}>{work.title}</h1>

                    {work.description && (
                        <p className={styles.cardDesc}>
                            {work.description}
                        </p>
                    )}

                    {/* Meta info */}
                    <div className={styles.projectMeta}>
                        <span className={`${styles.status} ${badge.className}`}>
                            {badge.label}
                        </span>
                        {work.role && (
                            <span className={styles.tech}>{work.role}</span>
                        )}
                    </div>

                    {/* Tech Stack */}
                    {work.tech_stack && work.tech_stack.length > 0 && (
                        <div className={styles.techStack}>
                            {work.tech_stack.map((tech: string) => (
                                <span key={tech} className={styles.tech}>
                                    <span className={styles.techDot} />
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Links */}
                    <div className={styles.projectLinks}>
                        {work.repo_url && (
                            <a
                                href={work.repo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.projectLink}
                            >
                                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                                View Repository
                            </a>
                        )}
                        {work.demo_url && (
                            <a
                                href={work.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.projectLink}
                            >
                                {work.demo_label || 'Live Demo →'}
                            </a>
                        )}
                    </div>
                </header>

                {/* Body content - Markdown or Case Study */}
                <div className={styles.projectBody}>
                    {work.body ? (
                        <MarkdownRenderer content={work.body} />
                    ) : (
                        <div className={styles.caseStudy}>
                            {work.problem && (
                                <section className={styles.caseSection}>
                                    <h2 className={styles.caseSectionTitle}>Problem</h2>
                                    <p className={styles.caseSectionContent}>{work.problem}</p>
                                </section>
                            )}

                            {work.constraints && (
                                <section className={styles.caseSection}>
                                    <h2 className={styles.caseSectionTitle}>Constraints</h2>
                                    <p className={styles.caseSectionContent}>{work.constraints}</p>
                                </section>
                            )}

                            {work.decisions && (
                                <section className={styles.caseSection}>
                                    <h2 className={styles.caseSectionTitle}>Decisions</h2>
                                    <p className={styles.caseSectionContent}>{work.decisions}</p>
                                </section>
                            )}

                            {work.tech_context && (
                                <section className={styles.caseSection}>
                                    <h2 className={styles.caseSectionTitle}>Technical Context</h2>
                                    <p className={styles.caseSectionContent}>{work.tech_context}</p>
                                </section>
                            )}

                            {work.outcome && (
                                <section className={styles.caseSection}>
                                    <h2 className={styles.caseSectionTitle}>Outcome</h2>
                                    <p className={styles.caseSectionContent}>{work.outcome}</p>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </article>
        </div>
    )
}
