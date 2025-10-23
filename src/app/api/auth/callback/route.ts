import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/', req.url))
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}
