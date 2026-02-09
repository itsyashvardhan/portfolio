import { neon } from '@neondatabase/serverless'
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schema from './schema'

let _db: NeonHttpDatabase<typeof schema> | null = null

function getDb(): NeonHttpDatabase<typeof schema> {
    if (!_db) {
        const databaseUrl = process.env.DATABASE_URL
        if (!databaseUrl) {
            throw new Error(
                'DATABASE_URL is not set. Please set it in your .env.local file.\n' +
                'Get your connection string from https://console.neon.tech'
            )
        }
        const sql = neon(databaseUrl)
        _db = drizzle(sql, { schema })
    }
    return _db
}

export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
    get(_, prop) {
        return (getDb() as any)[prop]
    },
})

export { schema }
