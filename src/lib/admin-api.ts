export async function adminFetch(table: string): Promise<any> {
    const res = await fetch(`/api/admin?table=${table}`)
    if (!res.ok) throw new Error('Failed to fetch')
    const json = await res.json()
    return json.data
}

export async function adminAction(
    table: string,
    action: string,
    data?: any,
    id?: string
): Promise<any> {
    const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, action, data, id }),
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Request failed')
    }
    return res.json()
}
