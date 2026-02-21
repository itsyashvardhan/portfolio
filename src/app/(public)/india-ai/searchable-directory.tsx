'use client'

import { useEffect, useMemo, useState } from 'react'
import type { IndiaAiSection } from '@/lib/india-ai-data'
import styles from './page.module.css'

type SearchableDirectoryProps = {
    sections: IndiaAiSection[]
}

export function SearchableDirectory({ sections }: SearchableDirectoryProps) {
    const [query, setQuery] = useState('')
    const [activeSection, setActiveSection] = useState<string>('')

    const filteredSections = useMemo(() => {
        const term = query.trim().toLowerCase()
        if (!term) return sections

        return sections
            .map((section) => ({
                ...section,
                organizations: section.organizations.filter((entry) => {
                    const haystack = [
                        entry.organization,
                        entry.notes,
                        entry.email,
                        entry.website,
                        entry.linkedin,
                        entry.contact,
                    ]
                        .join(' ')
                        .toLowerCase()

                    return haystack.includes(term)
                }),
            }))
            .filter((section) => section.organizations.length > 0)
    }, [query, sections])

    const totalMatches = filteredSections.reduce((sum, section) => sum + section.organizations.length, 0)
    const hasSearch = query.trim().length > 0

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

                if (visible[0]?.target.id) {
                    setActiveSection(visible[0].target.id)
                }
            },
            {
                rootMargin: '-20% 0px -65% 0px',
                threshold: [0.15, 0.35, 0.6],
            }
        )

        filteredSections.forEach((section) => {
            const element = document.getElementById(section.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [filteredSections])

    return (
        <>
            <section className={`container ${styles.searchSection}`}>
                <div className={styles.searchHeader}>
                    <label htmlFor="india-ai-search" className={styles.searchLabel}>
                        Search Organizations
                    </label>
                    {hasSearch && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery('')
                                setActiveSection('')
                            }}
                            className={styles.clearButton}
                        >
                            Clear
                        </button>
                    )}
                </div>
                <div className={styles.searchRow}>
                    <span className={styles.searchIcon} aria-hidden="true">⌕</span>
                    <input
                        id="india-ai-search"
                        type="search"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value)
                            setActiveSection('')
                        }}
                        placeholder="Search by organization, category, notes, contact, email..."
                        className={styles.searchInput}
                    />
                    <span className={styles.searchMeta}>
                        {hasSearch ? `${totalMatches} match${totalMatches === 1 ? '' : 'es'}` : `${totalMatches} total`}
                    </span>
                </div>
            </section>

            <div className={styles.indexBar}>
                <div className="container">
                    <ul className={styles.indexList}>
                        {filteredSections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className={`${styles.indexLink} ${activeSection === section.id ? styles.indexLinkActive : ''}`}
                                >
                                    <span>{section.title}</span>
                                    <span className={styles.badge}>{section.organizations.length}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <section className="container">
                <div className={styles.sections}>
                    {filteredSections.length === 0 ? (
                        <p className={styles.noResults}>No results found for “{query}”.</p>
                    ) : (
                        filteredSections.map((section) => (
                            <section key={section.id} id={section.id} className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                                    <span className={styles.sectionCount}>
                                        {section.organizations.length} organizations
                                    </span>
                                </div>

                                <div className={styles.grid}>
                                    {section.organizations.map((entry) => (
                                        <article key={entry.id} className={styles.card}>
                                            <h3 className={styles.organization}>{entry.organization}</h3>

                                            <dl className={styles.infoList}>
                                                <div className={styles.infoItem}>
                                                    <dt>Website</dt>
                                                    <dd>
                                                        <a href={entry.website} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                                            {getDisplayHost(entry.website)}
                                                        </a>
                                                    </dd>
                                                </div>

                                                <div className={styles.infoItem}>
                                                    <dt>Contact</dt>
                                                    <dd className={styles.contact}>{entry.contact}</dd>
                                                </div>

                                                <div className={styles.infoItem}>
                                                    <dt>Email</dt>
                                                    <dd>
                                                        <a href={`mailto:${entry.email}`} className={styles.link}>
                                                            {entry.email}
                                                        </a>
                                                    </dd>
                                                </div>

                                                {entry.linkedin && (
                                                    <div className={styles.infoItem}>
                                                        <dt>LinkedIn</dt>
                                                        <dd>
                                                            <a href={normalizeLinkedIn(entry.linkedin)} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                                                {getDisplayLinkedIn(entry.linkedin)}
                                                            </a>
                                                        </dd>
                                                    </div>
                                                )}
                                            </dl>

                                            <p className={styles.notes}>{entry.notes}</p>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        ))
                    )}
                </div>
            </section>
        </>
    )
}

function normalizeLinkedIn(linkedin: string): string {
    if (!linkedin) return ''
    if (linkedin.startsWith('http://') || linkedin.startsWith('https://')) return linkedin
    return `https://${linkedin}`
}

function getDisplayHost(url: string): string {
    try {
        return new URL(url).hostname.replace(/^www\./, '')
    } catch {
        return url
    }
}

function getDisplayLinkedIn(linkedin: string): string {
    return linkedin.replace(/^https?:\/\//, '')
}
