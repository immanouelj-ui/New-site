import { NextResponse } from "next/server";

// Stub endpoint — wire to a real notification/CRM once available.
export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  if (!data || typeof data.email !== "string" || !data.email.includes("@")) {
    return NextResponse.json({ ok: false, error: "invalid-email" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
