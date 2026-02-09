const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

export function generateSecret(length = 20): string {
    const bytes = new Uint8Array(length)
    crypto.getRandomValues(bytes)
    return Array.from(bytes).map(b => BASE32_ALPHABET[b % 32]).join('')
}

export function buildOtpAuthUri(secret: string, email: string, issuer = 'Portfolio'): string {
    return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(email)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`
}

export async function verify(secret: string, code: string): Promise<boolean> {
    const timeStep = 30
    const now = Math.floor(Date.now() / 1000)

    for (let i = -1; i <= 1; i++) {
        const counter = Math.floor((now + i * timeStep) / timeStep)
        const generated = await generate(secret, counter)
        if (generated === code) return true
    }
    return false
}

async function generate(secret: string, counter: number): Promise<string> {
    const keyBytes = base32Decode(secret)
    const counterBytes = new Uint8Array(8)
    let c = counter
    for (let i = 7; i >= 0; i--) {
        counterBytes[i] = c & 0xff
        c = Math.floor(c / 256)
    }

    const key = await crypto.subtle.importKey(
        'raw', keyBytes.buffer as ArrayBuffer, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']
    )
    const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, counterBytes.buffer as ArrayBuffer))

    const offset = sig[sig.length - 1] & 0xf
    const binary =
        ((sig[offset] & 0x7f) << 24) |
        ((sig[offset + 1] & 0xff) << 16) |
        ((sig[offset + 2] & 0xff) << 8) |
        (sig[offset + 3] & 0xff)

    return (binary % 1000000).toString().padStart(6, '0')
}

function base32Decode(input: string): Uint8Array {
    const cleaned = input.replace(/=+$/, '').toUpperCase()
    const output: number[] = []
    let bits = 0
    let value = 0

    for (const char of cleaned) {
        const idx = BASE32_ALPHABET.indexOf(char)
        if (idx === -1) continue
        value = (value << 5) | idx
        bits += 5
        if (bits >= 8) {
            output.push((value >> (bits - 8)) & 0xff)
            bits -= 8
        }
    }
    return new Uint8Array(output)
}
