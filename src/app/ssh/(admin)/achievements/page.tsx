'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import styles from '../experience/page.module.css'

interface Achievement {
    id: string
    title: string
    description: string
    date: string | null
    link: string | null
    icon: string | null
    display_order: number
}

export default function AdminAchievementsPage() {
    const [achievements, setAchievements] = useState<Achievement[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        link: '',
        icon: '🏆',
        display_order: 0,
    })
    const supabase = createClient()

    useEffect(() => {
        fetchAchievements()
    }, [])

    const fetchAchievements = async () => {
        const { data } = await supabase
            .from('achievements')
            .select('*')
            .order('display_order', { ascending: true })

        if (data) setAchievements(data)
        setLoading(false)
    }

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            date: '',
            link: '',
            icon: '🏆',
            display_order: achievements.length,
        })
        setEditingId(null)
    }

    const startEdit = (ach: Achievement) => {
        setFormData({
            title: ach.title,
            description: ach.description || '',
            date: ach.date || '',
            link: ach.link || '',
            icon: ach.icon || '🏆',
            display_order: ach.display_order,
        })
        setEditingId(ach.id)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            ...formData,
            date: formData.date || null,
            link: formData.link || null,
            icon: formData.icon || null,
        }

        if (editingId) {
            await supabase
                .from('achievements')
                .update(payload)
                .eq('id', editingId)
        } else {
            await supabase
                .from('achievements')
                .insert([payload])
        }

        resetForm()
        fetchAchievements()
    }

    const deleteAchievement = async (id: string) => {
        if (!confirm('Are you sure?')) return
        await supabase.from('achievements').delete().eq('id', id)
        fetchAchievements()
    }

    if (loading) return <div className={styles.page}><p>Loading...</p></div>

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Achievements</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>{editingId ? 'Edit Achievement' : 'Add Achievement'}</h2>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Icon (Emoji)</label>
                        <input
                            type="text"
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            className={styles.input}
                            placeholder="🏆"
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Date (Optional)</label>
                        <input
                            type="text"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className={styles.input}
                            placeholder="Sept 2023"
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Link (Optional)</label>
                        <input
                            type="url"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className={styles.input}
                            placeholder="https://..."
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={styles.textarea}
                        rows={2}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Display Order</label>
                    <input
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formActions}>
                    {editingId && (
                        <button type="button" onClick={resetForm} className={styles.cancelBtn}>
                            Cancel
                        </button>
                    )}
                    <button type="submit" className={styles.saveBtn}>
                        {editingId ? 'Update' : 'Add'}
                    </button>
                </div>
            </form>

            <div className={styles.list}>
                <h2 className={styles.listTitle}>All Achievements</h2>
                {achievements.length === 0 ? (
                    <p className={styles.empty}>No achievements added yet.</p>
                ) : (
                    achievements.map((ach) => (
                        <div key={ach.id} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{ach.icon}</span>
                                    <div>
                                        <h3 className={styles.itemTitle}>{ach.title}</h3>
                                        <p className={styles.itemSubtitle}>{ach.date}</p>
                                    </div>
                                </div>
                                <span className={styles.order}>#{ach.display_order}</span>
                            </div>
                            <div className={styles.actions}>
                                <button onClick={() => startEdit(ach)} className={styles.actionBtn}>Edit</button>
                                <button onClick={() => deleteAchievement(ach.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}>
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
