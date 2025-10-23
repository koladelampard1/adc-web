import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const { role } = await req.json()
  cookies().set("role", role, { httpOnly: false, path: "/", maxAge: 60 * 60 * 24 * 7 })
  return NextResponse.json({ ok: true })
}