import { NextRequest, NextResponse } from 'next/server'
import { requireFullAuth } from '@/lib/auth'
import { db } from '@/lib/db'
import {
    blog,
    works,
    profile,
    experience,
    skills,
    education,
    achievements,
    socialLinks,
    settings,
    adminUsers,
} from '@/lib/db/schema'
import { eq, asc, desc } from 'drizzle-orm'
import * as totp from '@/lib/totp'

// Auth guard helper — enforces full auth including MFA
async function requireAdmin() {
    try {
        return await requireFullAuth()
    } catch {
        return null
    }
}

export async function GET(request: NextRequest) {
    const session = await requireAdmin()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const table = request.nextUrl.searchParams.get('table')

    try {
        switch (table) {
            case 'blog': {
                const data = await db.select().from(blog).orderBy(desc(blog.created_at))
                return NextResponse.json({ data })
            }
            case 'works': {
                const data = await db.select().from(works).orderBy(asc(works.display_order))
                return NextResponse.json({ data })
            }
            case 'profile': {
                const [data] = await db.select().from(profile).limit(1)
                return NextResponse.json({ data: data || null })
            }
            case 'experience': {
                const data = await db.select().from(experience).orderBy(asc(experience.display_order))
                return NextResponse.json({ data })
            }
            case 'skills': {
                const data = await db.select().from(skills).orderBy(asc(skills.display_order))
                return NextResponse.json({ data })
            }
            case 'education': {
                const data = await db.select().from(education).orderBy(asc(education.display_order))
                return NextResponse.json({ data })
            }
            case 'achievements': {
                const data = await db.select().from(achievements).orderBy(asc(achievements.display_order))
                return NextResponse.json({ data })
            }
            case 'social_links': {
                const data = await db.select().from(socialLinks).orderBy(asc(socialLinks.display_order))
                return NextResponse.json({ data })
            }
            case 'settings': {
                const data = await db.select().from(settings)
                return NextResponse.json({ data })
            }
            case 'mfa_status': {
                const [user] = await db
                    .select({
                        totp_enabled: adminUsers.totp_enabled,
                    })
                    .from(adminUsers)
                    .where(eq(adminUsers.id, session.userId))
                    .limit(1)
                return NextResponse.json({ data: { isEnrolled: user?.totp_enabled || false } })
            }
            default:
                return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
        }
    } catch (error) {
        console.error('Admin GET error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const session = await requireAdmin()
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { table: tableName, action, data: payload, id } = body

        // Input validation: require table and action
        if (!tableName || typeof tableName !== 'string') {
            return NextResponse.json({ error: 'Missing or invalid "table" field' }, { status: 400 })
        }
        if (!action || typeof action !== 'string') {
            return NextResponse.json({ error: 'Missing or invalid "action" field' }, { status: 400 })
        }

        const VALID_TABLES = ['blog', 'works', 'profile', 'experience', 'skills', 'education', 'achievements', 'social_links', 'settings', 'mfa']
        if (!VALID_TABLES.includes(tableName)) {
            return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
        }

        const VALID_ACTIONS = ['insert', 'update', 'delete', 'upsert', 'get_by_id', 'enroll', 'verify_and_enable', 'unenroll']
        if (!VALID_ACTIONS.includes(action)) {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
        }

        // Require id for update/delete operations
        if ((action === 'update' || action === 'delete' || action === 'get_by_id') && !id) {
            return NextResponse.json({ error: 'Missing "id" for this action' }, { status: 400 })
        }

        // Require payload for insert/update/upsert
        if (['insert', 'update', 'upsert', 'verify_and_enable'].includes(action) && !payload) {
            return NextResponse.json({ error: 'Missing "data" payload' }, { status: 400 })
        }

        // Sanitize payload: strip fields that should never be set directly
        if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
            delete payload.id
            delete payload.created_at
        }

        switch (tableName) {
            case 'blog': {
                if (action === 'insert') {
                    await db.insert(blog).values(payload)
                } else if (action === 'update' && id) {
                    await db.update(blog).set(payload).where(eq(blog.id, id))
                } else if (action === 'delete' && id) {
                    await db.delete(blog).where(eq(blog.id, id))
                }
                break
            }
            case 'works': {
                if (action === 'insert') {
                    await db.insert(works).values(payload)
                } else if (action === 'update' && id) {
                    await db.update(works).set(payload).where(eq(works.id, id))
                } else if (action === 'delete' && id) {
                    await db.delete(works).where(eq(works.id, id))
                } else if (action === 'get_by_id' && id) {
                    const [result] = await db.select().from(works).where(eq(works.id, id)).limit(1)
                    return NextResponse.json({ data: result || null })
                }
                break
            }
            case 'profile': {
                if (action === 'upsert') {
                    const [existing] = await db.select({ id: profile.id }).from(profile).limit(1)
                    if (existing) {
                        await db.update(profile).set(payload).where(eq(profile.id, existing.id))
                    } else {
                        await db.insert(profile).values(payload)
                    }
                }
                break
            }
            case 'experience': {
                if (action === 'insert') {
                    await db.insert(experience).values(payload)
                } else if (action === 'update' && id) {
                    await db.update(experience).set(payload).where(eq(experience.id, id))
                } else if (action === 'delete' && id) {
                    await db.delete(experience).where(eq(experience.id, id))
                }
                break
            }
            case 'skills': {
                if (action === 'insert') {
                    await db.insert(skills).values(payload)
                } else if (action === 'update' && id) {
                    await db.update(skills).set(payload).where(eq(skills.id, id))
                } else if (action === 'delete' && id) {
                    await db.delete(skills).where(eq(skills.id, id))
                }
                break
            }
            case 'education': {
                if (action === 'insert') {
                    await db.insert(education).values(payload)
                } else if (action === 'update' && id) {
                    await db.update(education).set(payload).where(eq(education.id, id))
                } else if (action === 'delete' && id) {
                    await db.delete(education).where(eq(education.id, id))
                }
                break
            }
            case 'achievements': {
                if (action === 'insert') {
                    await db.insert(achievements).values(payload)
                } else if (action === 'update' && id) {
                    await db.update(achievements).set(payload).where(eq(achievements.id, id))
                } else if (action === 'delete' && id) {
                    await db.delete(achievements).where(eq(achievements.id, id))
                }
                break
            }
            case 'social_links': {
                if (action === 'insert') {
                    await db.insert(socialLinks).values(payload)
                } else if (action === 'update' && id) {
                    await db.update(socialLinks).set(payload).where(eq(socialLinks.id, id))
                } else if (action === 'delete' && id) {
                    await db.delete(socialLinks).where(eq(socialLinks.id, id))
                }
                break
            }
            case 'settings': {
                if (action === 'upsert') {
                    // payload is an array of { key, value, description }
                    for (const item of payload) {
                        const [existing] = await db
                            .select({ id: settings.id })
                            .from(settings)
                            .where(eq(settings.key, item.key))
                            .limit(1)

                        if (existing) {
                            await db.update(settings)
                                .set({ value: item.value, description: item.description })
                                .where(eq(settings.key, item.key))
                        } else {
                            await db.insert(settings).values(item)
                        }
                    }
                }
                break
            }
            case 'mfa': {
                if (action === 'enroll') {
                    const secret = totp.generateSecret()
                    const uri = totp.buildOtpAuthUri(secret, session.email)

                    await db.update(adminUsers)
                        .set({ totp_secret: secret })
                        .where(eq(adminUsers.id, session.userId))

                    return NextResponse.json({
                        data: { secret, uri, id: session.userId }
                    })
                } else if (action === 'verify_and_enable') {
                    const { code } = payload
                    const [user] = await db
                        .select({ totp_secret: adminUsers.totp_secret })
                        .from(adminUsers)
                        .where(eq(adminUsers.id, session.userId))
                        .limit(1)

                    if (!user?.totp_secret) {
                        return NextResponse.json({ error: 'No TOTP secret found' }, { status: 400 })
                    }

                    const isValid = await totp.verify(user.totp_secret, code)
                    if (!isValid) {
                        return NextResponse.json({ error: 'Invalid code' }, { status: 401 })
                    }

                    await db.update(adminUsers)
                        .set({ totp_enabled: true })
                        .where(eq(adminUsers.id, session.userId))

                    return NextResponse.json({ success: true })
                } else if (action === 'unenroll') {
                    await db.update(adminUsers)
                        .set({ totp_enabled: false, totp_secret: null })
                        .where(eq(adminUsers.id, session.userId))

                    return NextResponse.json({ success: true })
                }
                break
            }
            default:
                return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Admin POST error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
