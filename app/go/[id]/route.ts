import { NextRequest, NextResponse } from "next/server";
import { findLink, refFromHeader } from "@/lib/util";
import { track } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = findLink(id);
  if (!link) return NextResponse.redirect(new URL("/", req.url), 307);
  // Count, but never make the visitor wait long for it.
  const country = req.headers.get("x-vercel-ip-country") || undefined;
  await Promise.race([track("click", id, { country, ref: refFromHeader(req.headers.get("referer")) }), new Promise((r) => setTimeout(r, 400))]);
  return NextResponse.redirect(link.url, 307);
}
