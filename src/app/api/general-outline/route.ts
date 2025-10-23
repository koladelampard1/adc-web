import { NextResponse } from "next/server"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  const { topic } = await req.json()

  // Identify current user (best practice: use a Service Role key on server; for now keep simple)
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id ?? null

  // Create ai_job row
  const { data: job } = await supabase
    .from("ai_jobs")
    .insert({ user_id: userId, kind: "outline", input: { topic }, status: "running" })
    .select()
    .single()

  // Call OpenAI
  const prompt = `Create a week-by-week course outline for "${topic}". Provide 4-8 modules with 3-5 lesson titles each. Return as markdown.`
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  })
  const outline = completion.choices[0]?.message?.content ?? ""

  // Save result
  await supabase
    .from("ai_jobs")
    .update({ status: "succeeded", output: { outline } })
    .eq("id", job.id)

  return NextResponse.json({ outline })
}