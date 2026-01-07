'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import styles from '../experience/page.module.css'

interface Education {
    id: string
    institution: string
    degree: string
    field: string
    start_date: string | null
    end_date: string | null
    description: string
    display_order: number
}

export default function AdminEducationPage() {
    const [education, setEducation] = useState<Education[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        institution: '',
        degree: '',
        field: '',
        start_date: '',
        end_date: '',
        description: '',
        display_order: 0,
    })
    const supabase = createClient()

    useEffect(() => {
        fetchEducation()
    }, [])

    const fetchEducation = async () => {
        const { data } = await supabase
            .from('education')
            .select('*')
            .order('display_order', { ascending: true })

        if (data) setEducation(data)
        setLoading(false)
    }

    const resetForm = () => {
        setFormData({
            institution: '',
            degree: '',
            field: '',
            start_date: '',
            end_date: '',
            description: '',
            display_order: education.length,
        })
        setEditingId(null)
    }

    const startEdit = (edu: Education) => {
        setFormData({
            institution: edu.institution,
            degree: edu.degree,
            field: edu.field || '',
            start_date: edu.start_date || '',
            end_date: edu.end_date || '',
            description: edu.description || '',
            display_order: edu.display_order,
        })
        setEditingId(edu.id)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            ...formData,
            start_date: formData.start_date || null,
            end_date: formData.end_date || null,
        }

        if (editingId) {
            await supabase
                .from('education')
                .update(payload)
                .eq('id', editingId)
        } else {
            await supabase
                .from('education')
                .insert([payload])
        }

        resetForm()
        fetchEducation()
    }

    const deleteEducation = async (id: string) => {
        if (!confirm('Are you sure?')) return
        await supabase.from('education').delete().eq('id', id)
        fetchEducation()
    }

    if (loading) return <div className={styles.page}><p>Loading...</p></div>

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Education</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>{editingId ? 'Edit Education' : 'Add Education'}</h2>

                <div className={styles.field}>
                    <label className={styles.label}>Institution</label>
                    <input
                        type="text"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Degree</label>
                        <input
                            type="text"
                            value={formData.degree}
                            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Field of Study</label>
                        <input
                            type="text"
                            value={formData.field}
                            onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                            className={styles.input}
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
                        <label className={styles.label}>End Date</label>
                        <input
                            type="date"
                            value={formData.end_date}
                            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={styles.textarea}
                        rows={3}
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
                <h2 className={styles.listTitle}>Education History</h2>
                {education.length === 0 ? (
                    <p className={styles.empty}>No education history added yet.</p>
                ) : (
                    education.map((edu) => (
                        <div key={edu.id} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <div>
                                    <h3 className={styles.itemTitle}>{edu.degree} in {edu.field}</h3>
                                    <p className={styles.itemSubtitle}>{edu.institution}</p>
                                </div>
                                <span className={styles.order}>#{edu.display_order}</span>
                            </div>
                            <div className={styles.actions}>
                                <button onClick={() => startEdit(edu)} className={styles.actionBtn}>Edit</button>
                                <button onClick={() => deleteEducation(edu.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}>
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
