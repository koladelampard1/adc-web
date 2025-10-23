'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const router = useRouter()

  // If already signed-in, bounce to /admin (or change to '/')
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/admin')
    })
  }, [router])
  // e.g., in src/app/login/page.tsx after sign-in succeeds
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function setRoleCookie() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()
  // Set a cookie with fetch to an API route (NextJS can set HttpOnly)
  await fetch("/api/set-role", {
    method: "POST",
    body: JSON.stringify({ role: data?.role ?? "user" }),
  })
}

  // Where Supabase will send the magic link back to (we handle cookies there)
  const redirectTo =
    typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback`
      : '/auth/callback'

  return (
    <main className="min-h-screen grid place-items-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-xl bg-black" />
            <span className="text-xl font-semibold">ADC Learning Platform</span>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with a magic link sent to your email.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'black',
                    brandAccent: '#111111',
                  },
                  radii: { borderRadiusButton: '0.75rem', inputBorderRadius: '0.75rem' },
                },
              },
            }}
            providers={[]}
            view="magic_link"
            showLinks={false}
            redirectTo={redirectTo}
            localization={{
              variables: {
                magic_link: {
                  email_input_label: 'Email address',
                  button_label: 'Send magic link',
                  confirmation_text:
                    'Check your inbox for a sign-in link. You can close this window.',
                },
              },
            }}
          />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to our{' '}
          <Link href="/terms" className="underline">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  )
}