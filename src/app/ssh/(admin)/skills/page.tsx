'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import styles from '../experience/page.module.css'

type SkillCategory = 'languages' | 'frameworks' | 'tools' | 'soft-skills' | 'general'

interface Skill {
    id: string
    name: string
    category: SkillCategory
    proficiency: number
    display_order: number
}

export default function AdminSkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshKey, setRefreshKey] = useState(0)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        category: 'general' as SkillCategory,
        proficiency: 80,
        display_order: 0,
    })
    const supabase = createClient()

    useEffect(() => {
        let isMounted = true
        const loadSkills = async () => {
            const { data } = await supabase
                .from('skills')
                .select('*')
                .order('display_order', { ascending: true })

            if (isMounted) {
                if (data) setSkills(data)
                setLoading(false)
            }
        }
        loadSkills()
        return () => { isMounted = false }
    }, [supabase, refreshKey])

    const refresh = () => setRefreshKey(k => k + 1)

    const resetForm = () => {
        setFormData({
            name: '',
            category: 'general',
            proficiency: 80,
            display_order: skills.length,
        })
        setEditingId(null)
    }

    const startEdit = (skill: Skill) => {
        setFormData({
            name: skill.name,
            category: skill.category,
            proficiency: skill.proficiency,
            display_order: skill.display_order,
        })
        setEditingId(skill.id)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (editingId) {
            await supabase
                .from('skills')
                .update(formData)
                .eq('id', editingId)
        } else {
            await supabase
                .from('skills')
                .insert([formData])
        }

        resetForm()
        refresh()
    }

    const deleteSkill = async (id: string) => {
        if (!confirm('Are you sure?')) return
        await supabase.from('skills').delete().eq('id', id)
        refresh()
    }

    if (loading) return <div className={styles.page}><p>Loading...</p></div>

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Skills</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>{editingId ? 'Edit Skill' : 'Add Skill'}</h2>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as SkillCategory })}
                            className={styles.select}
                        >
                            <option value="languages">Languages</option>
                            <option value="frameworks">Frameworks</option>
                            <option value="tools">Tools</option>
                            <option value="soft-skills">Soft Skills</option>
                            <option value="general">General</option>
                        </select>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Proficiency (%)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.proficiency}
                            onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) || 0 })}
                            className={styles.input}
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
                <h2 className={styles.listTitle}>All Skills</h2>
                {skills.length === 0 ? (
                    <p className={styles.empty}>No skills added yet.</p>
                ) : (
                    skills.map((skill) => (
                        <div key={skill.id} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <div>
                                    <h3 className={styles.itemTitle}>{skill.name}</h3>
                                    <p className={styles.itemSubtitle}>{skill.category} • {skill.proficiency}%</p>
                                </div>
                                <span className={styles.order}>#{skill.display_order}</span>
                            </div>
                            <div className={styles.actions}>
                                <button onClick={() => startEdit(skill)} className={styles.actionBtn}>Edit</button>
                                <button onClick={() => deleteSkill(skill.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}>
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
