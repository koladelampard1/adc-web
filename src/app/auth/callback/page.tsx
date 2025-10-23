'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthCallbackPage() {
  const router = useRouter()
  const [msg, setMsg] = useState('Finalizing sign-in…')

  useEffect(() => {
    const run = async () => {
      // Example: #access_token=...&refresh_token=...&type=signup&...
      const hash = window.location.hash.replace(/^#/, '')
      const params = new URLSearchParams(hash)
      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token')

      if (!access_token || !refresh_token) {
        setMsg('No session tokens found in the URL.')
        return
      }

      // Apply session on the client
      const { error } = await supabase.auth.setSession({ access_token, refresh_token })
      if (error) {
        setMsg('Failed to set session: ' + error.message)
        return
      }

      // Hit the server route to set auth cookies
      await fetch('/api/auth/callback', { method: 'GET', credentials: 'include' })

      // Clean the URL and go home (or to /admin)
      router.replace('/')
    }
    run()
  }, [router])

  return (
    <main className="min-h-screen grid place-items-center p-8">
      <p className="text-gray-600">{msg}</p>
    </main>
  )
}
