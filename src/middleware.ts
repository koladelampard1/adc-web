import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Only guard /admin
  if (!req.nextUrl.pathname.startsWith("/admin")) return NextResponse.next()

  // We’ll read a lightweight role hint from a cookie we set after sign-in.
  const role = req.cookies.get("role")?.value
  if (role === "admin") return NextResponse.next()

  // Not admin: bounce to home
  return NextResponse.redirect(new URL("/", req.url))
}

export const config = {
  matcher: ["/admin/:path*"],
}