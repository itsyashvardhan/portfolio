import React from 'react'

// This layout wraps ALL /ssh routes
// The auth check happens in the (admin) group layout, not here
// This allows /ssh/login to be accessible without authentication
export default function SSHRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
