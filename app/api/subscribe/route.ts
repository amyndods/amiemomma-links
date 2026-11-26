import { NextRequest, NextResponse } from "next/server";
import { pipeline, storeEnabled } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { email, hp } = await req.json().catch(() => ({}));
  if (hp) return NextResponse.json({ ok: true }); // honeypot
  const e = String(email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) || e.length > 200) {
    return NextResponse.json({ ok: false, error: "Enter a valid email" }, { status: 400 });
  }
  if (!storeEnabled) return NextResponse.json({ ok: false, error: "Signups aren't set up yet" }, { status: 503 });
  await pipeline([["ZADD", "emails", Date.now(), e]]);
  return NextResponse.json({ ok: true });
}
