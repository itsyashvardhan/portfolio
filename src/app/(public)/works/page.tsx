import Link from 'next/link'
import { getWorksList } from '@/lib/data'
import styles from './page.module.css'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import type { Metadata } from 'next'

// Render dynamically — requires DB access
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Works',
    description: 'Selected projects and work where I owned the outcome.',
}

export default async function WorksPage() {
    const { projects, featured } = await getWorksList()

    const getStatusBadge = (status: string) => {
        const badges: Record<string, { label: string; className: string }> = {
            'active': { label: 'Active', className: styles.statusActive },
            'archived': { label: 'Archived', className: styles.statusArchived },
            'in-progress': { label: 'In Progress', className: styles.statusProgress },
        }
        return badges[status] || badges['active']
    }

    return (
        <div className={styles.page}>
            <section className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Works</h1>
                    <p className={styles.description}>
                        Selected projects where I owned the outcome. Open source and professional work.
                    </p>
                    {projects.length > 0 && (
                        <div className={styles.headerMeta}>
                            <span>{projects.length} project{projects.length !== 1 ? 's' : ''}</span>
                        </div>
                    )}
                </div>
            </section>

            <section className="container">
                {projects.length === 0 ? (
                    <div className={styles.empty}>
                        <div className={styles.emptyIcon}>◈</div>
                        <p>No projects published yet. I''m currently building something great.</p>
                    </div>
                ) : (
                    <div className={styles.section}>
                        <div className={styles.grid}>
                            {projects.map((project) => (
                                <ProjectCard key={project.slug} project={project} getStatusBadge={getStatusBadge} />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

// GitHub-style Project Card Component
function ProjectCard({
    project,
    getStatusBadge
}: {
    project: any
    getStatusBadge: (status: string) => { label: string; className: string }
}) {
    const badge = getStatusBadge(project.project_status)

    return (
        <CardSpotlight className={styles.card}>
            {/* Card Header */}
            <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>◈</span>
                <Link href={`/works/${project.slug}`} className={styles.cardName}>
                    {project.title}
                </Link>
                <span className={`${styles.status} ${badge.className}`}>
                    {badge.label}
                </span>
                {project.featured && (
                    <span className={styles.featured} title="Featured Project">
                        <span className={styles.featuredIcon}>★</span>
                        <span className={styles.featuredLabel}>Featured</span>
                    </span>
                )}
            </div>

            {/* Description */}
            <p className={styles.cardDesc}>{project.description}</p>

            {/* Outcome - Impact statement */}
            {project.outcome && (
                <p className={styles.cardOutcome}>
                    <span className={styles.outcomeIcon}>→</span>
                    {project.outcome}
                </p>
            )}

            {/* Tech Stack */}
            {project.tech_stack && project.tech_stack.length > 0 && (
                <div className={styles.techStack}>
                    {project.tech_stack.slice(0, 5).map((tech: string) => (
                        <span key={tech} className={styles.tech}>
                            <span className={styles.techDot} />
                            {tech}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className={styles.cardFooter}>
                <div className={styles.links}>
                    {project.repo_url && (
                        <a
                            href={project.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                            aria-label="View repository"
                        >
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            <span className={styles.linkLabel}>Code</span>
                        </a>
                    )}
                    {project.demo_url && (
                        <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                            aria-label="View demo"
                        >
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                <path d="M4.5 3h7a.5.5 0 0 1 0 1h-5.793l5.647 5.646a.5.5 0 0 1-.708.708L5 4.707V10.5a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5z" />
                            </svg>
                            <span className={styles.linkLabel}>{project.demo_label || 'Demo'}</span>
                        </a>
                    )}
                </div>
            </div>
        </CardSpotlight>
    )
}
