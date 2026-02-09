'use client'

import { useState, useEffect } from 'react'
import { adminFetch, adminAction } from '@/lib/admin-api'
import styles from './page.module.css'

interface Experience {
    id: string
    organization: string
    role: string
    start_date: string | null
    end_date: string | null
    highlights: string[]
    display_order: number
}

export default function AdminExperiencePage() {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        organization: '',
        role: '',
        start_date: '',
        end_date: '',
        highlights: '',
        display_order: 0,
    })

    useEffect(() => {
        fetchExperiences()
    }, [])

    const fetchExperiences = async () => {
        const data = await adminFetch('experience')
        if (data) setExperiences(data)
        setLoading(false)
    }

    const resetForm = () => {
        setFormData({
            organization: '',
            role: '',
            start_date: '',
            end_date: '',
            highlights: '',
            display_order: experiences.length,
        })
        setEditingId(null)
    }

    const startEdit = (exp: Experience) => {
        setFormData({
            organization: exp.organization,
            role: exp.role,
            start_date: exp.start_date || '',
            end_date: exp.end_date || '',
            highlights: exp.highlights?.join('\n') || '',
            display_order: exp.display_order,
        })
        setEditingId(exp.id)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            organization: formData.organization,
            role: formData.role,
            start_date: formData.start_date || null,
            end_date: formData.end_date || null,
            highlights: formData.highlights.split('\n').map(h => h.trim()).filter(Boolean),
            display_order: formData.display_order,
        }

        if (editingId) {
            await adminAction('experience', 'update', payload, editingId)
        } else {
            await adminAction('experience', 'insert', payload)
        }

        resetForm()
        fetchExperiences()
    }

    const deleteExperience = async (id: string) => {
        if (!confirm('Are you sure you want to delete this?')) return
        await adminAction('experience', 'delete', undefined, id)
        fetchExperiences()
    }

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return 'Present'
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }

    if (loading) return <p>Loading...</p>

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Experience</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>{editingId ? 'Edit Experience' : 'Add Experience'}</h2>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Organization</label>
                        <input
                            type="text"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Role</label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Start Date</label>
                        <input
                            type="date"
                            value={formData.start_date}
                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>End Date (leave empty for Present)</label>
                        <input
                            type="date"
                            value={formData.end_date}
                            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Display Order</label>
                    <input
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                        className={styles.input}
                    />
                    <span className={styles.hint}>Lower numbers appear first</span>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Highlights (one per line)</label>
                    <textarea
                        value={formData.highlights}
                        onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                        className={styles.textarea}
                        rows={5}
                        placeholder="Key achievement or responsibility&#10;Another highlight&#10;..."
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
                <h2 className={styles.listTitle}>All Experience</h2>
                {experiences.length === 0 ? (
                    <p className={styles.empty}>No experience added yet.</p>
                ) : (
                    experiences.map((exp) => (
                        <div key={exp.id} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <div>
                                    <h3 className={styles.itemTitle}>{exp.role}</h3>
                                    <p className={styles.itemSubtitle}>
                                        {exp.organization} • {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                                    </p>
                                </div>
                                <span className={styles.order}>#{exp.display_order}</span>
                            </div>
                            <div className={styles.actions}>
                                <button onClick={() => startEdit(exp)} className={styles.actionBtn}>Edit</button>
                                <button onClick={() => deleteExperience(exp.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}>
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
