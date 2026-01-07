import React from 'react'
import Image from 'next/image'
import { getAboutPageData } from '@/lib/data'
import { MarkdownRenderer } from '@/components/markdown'
import styles from './page.module.css'
import type { Metadata } from 'next'

// Cache page for 1 hour
export const revalidate = 3600

export const metadata: Metadata = {
    title: 'About',
    description: 'Product & Solutions Engineer specializing in systems design and building products with intention.',
}

export default async function AboutPage() {
    const { profile, experiences, skills, education, achievements, socialLinks } = await getAboutPageData()

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return 'Present'
        return new Date(dateStr).getFullYear().toString()
    }

    const hasSkills = Object.values(skills).some(arr => arr.length > 0)

    return (
        <div className={styles.page}>
            {/* Header Section */}
            <section className={styles.header}>
                <div className="container">
                    <div className={styles.hero}>
                        {/* Profile Image - Only show if exists */}
                        {profile?.profile_image && (
                            <div className={styles.avatar}>
                                <Image
                                    src={profile.profile_image}
                                    alt={profile.name}
                                    width={120}
                                    height={120}
                                    className={styles.avatarImage}
                                />
                            </div>
                        )}

                        <div className={styles.heroContent}>
                            <h1 className={styles.name}>{profile?.name || 'Your Name'}</h1>
                            <p className={styles.role}>{profile?.title || 'Software Engineer'}</p>

                            {profile?.location && (
                                <p className={styles.location}>📍 {profile.location}</p>
                            )}

                            {profile?.available_for_work && (
                                <span className={styles.availableBadge}>✓ Open to opportunities</span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <div className={styles.content}>
                    {/* Bio Section */}
                    {profile?.bio && (
                        <section className={styles.section}>
                            <div className={styles.bio}>
                                <MarkdownRenderer content={profile.bio} />
                            </div>
                        </section>
                    )}

                    {/* Experience Section */}
                    {experiences.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Experience</h2>
                            <div className={styles.timeline}>
                                {experiences.map((exp) => (
                                    <div key={exp.id} className={styles.experienceCard}>
                                        <div className={styles.experienceHeader}>
                                            <div>
                                                <h3 className={styles.company}>{exp.organization}</h3>
                                                <p className={styles.expRole}>{exp.role}</p>
                                            </div>
                                            <span className={styles.duration}>
                                                {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        {exp.highlights && exp.highlights.length > 0 && (
                                            <ul className={styles.highlights}>
                                                {exp.highlights.map((highlight, i) => (
                                                    <li key={i}>{highlight}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills Section */}
                    {hasSkills && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Skills</h2>
                            <div className={styles.skillsGrid}>
                                {skills.languages.length > 0 && (
                                    <div className={styles.skillCategory}>
                                        <h3 className={styles.skillCategoryTitle}>Languages</h3>
                                        <div className={styles.skillTags}>
                                            {skills.languages.map((skill) => (
                                                <span key={skill.id} className={styles.skillTag}>{skill.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {skills.frameworks.length > 0 && (
                                    <div className={styles.skillCategory}>
                                        <h3 className={styles.skillCategoryTitle}>Frameworks</h3>
                                        <div className={styles.skillTags}>
                                            {skills.frameworks.map((skill) => (
                                                <span key={skill.id} className={styles.skillTag}>{skill.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {skills.tools.length > 0 && (
                                    <div className={styles.skillCategory}>
                                        <h3 className={styles.skillCategoryTitle}>Tools</h3>
                                        <div className={styles.skillTags}>
                                            {skills.tools.map((skill) => (
                                                <span key={skill.id} className={styles.skillTag}>{skill.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Education Section */}
                    {education.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Education</h2>
                            <div className={styles.educationList}>
                                {education.map((edu) => (
                                    <div key={edu.id} className={styles.educationCard}>
                                        <div className={styles.educationHeader}>
                                            <h3 className={styles.institution}>{edu.institution}</h3>
                                            <span className={styles.duration}>
                                                {formatDate(edu.start_date)} — {formatDate(edu.end_date)}
                                            </span>
                                        </div>
                                        <p className={styles.degree}>
                                            {edu.degree}{edu.field && ` in ${edu.field}`}
                                        </p>
                                        {edu.description && (
                                            <p className={styles.eduDescription}>{edu.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements Section */}
                    {achievements.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Achievements</h2>
                            <div className={styles.achievementsList}>
                                {achievements.map((achievement) => (
                                    <div key={achievement.id} className={styles.achievementCard}>
                                        <span className={styles.achievementIcon}>{achievement.icon}</span>
                                        <div>
                                            <h3 className={styles.achievementTitle}>
                                                {achievement.link ? (
                                                    <a href={achievement.link} target="_blank" rel="noopener noreferrer">
                                                        {achievement.title}
                                                    </a>
                                                ) : (
                                                    achievement.title
                                                )}
                                            </h3>
                                            {achievement.description && (
                                                <p className={styles.achievementDesc}>{achievement.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Contact Section */}
                    <section className={`${styles.section} ${styles.contactSection}`}>
                        <h2 className={styles.sectionTitle}>Get in Touch</h2>
                        <p className={styles.contactIntro}>
                            Open to product engineering roles, collaborations, and tiramisu.
                        </p>
                        <div className={styles.socialLinks}>
                            {socialLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target={link.platform !== 'email' ? '_blank' : undefined}
                                    rel={link.platform !== 'email' ? 'noopener noreferrer' : undefined}
                                    className={styles.socialLink}
                                >
                                    {getSocialIcon(link.platform)}
                                    <span>{link.display_name || link.platform}</span>
                                </a>
                            ))}
                        </div>

                        {profile?.resume_url && (
                            <a
                                href={profile.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.resumeBtn}
                            >
                                Download Resume →
                            </a>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}

// Social Icons Helper
function getSocialIcon(platform: string): React.ReactNode {
    const icons: Record<string, React.ReactNode> = {
        github: (
            <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
        ),
        linkedin: (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        twitter: (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        email: (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    }

    return icons[platform] || icons.email
}
