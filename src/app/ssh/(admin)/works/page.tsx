'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Work } from '@/lib/types'
import styles from './page.module.css'

export default function AdminWorksPage() {
    const [works, setWorks] = useState<Work[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchWorks()
    }, [])

    const fetchWorks = async () => {
        const { data } = await supabase
            .from('works')
            .select('*')
            .order('display_order', { ascending: true })

        if (data) setWorks(data)
        setLoading(false)
    }

    const toggleStatus = async (work: Work) => {
        const newStatus = work.status === 'published' ? 'draft' : 'published'
        await supabase
            .from('works')
            .update({ status: newStatus })
            .eq('id', work.id)

        fetchWorks()
    }

    const deleteWork = async (id: string) => {
        if (!confirm('Are you sure you want to delete this work?')) return

        await supabase.from('works').delete().eq('id', id)
        fetchWorks()
    }

    if (loading) return <p>Loading...</p>

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Works</h1>
                <Link href="/ssh/works/new" className={styles.addBtn}>+ New Work</Link>
            </div>

            <div className={styles.list}>
                {works.length === 0 ? (
                    <p className={styles.empty}>No works yet. Create your first one!</p>
                ) : (
                    works.map((work) => (
                        <div key={work.id} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <h2 className={styles.itemTitle}>{work.title}</h2>
                                <span className={`${styles.status} ${work.status === 'published' ? styles.published : styles.draft}`}>
                                    {work.status}
                                </span>
                            </div>
                            <div className={styles.actions}>
                                <button onClick={() => toggleStatus(work)} className={styles.actionBtn}>
                                    {work.status === 'published' ? 'Unpublish' : 'Publish'}
                                </button>
                                <Link href={`/ssh/works/${work.id}`} className={styles.actionBtn}>Edit</Link>
                                <button onClick={() => deleteWork(work.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
