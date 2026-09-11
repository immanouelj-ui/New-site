import { NextResponse } from "next/server";

// Stub endpoint: validates the payload shape and returns success.
// Wire this to a real CRM / database / email notification once available —
// the client already sends everything (including photo files) as FormData.
export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const postalCode = formData.get("postalCode");

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "invalid-email" }, { status: 400 });
  }
  if (!postalCode) {
    return NextResponse.json({ ok: false, error: "missing-postal-code" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
