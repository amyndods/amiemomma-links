import { NextRequest, NextResponse, after } from "next/server";
import { findLink, refFromHeader } from "@/lib/util";
import { track } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = findLink(id);
  if (!link) return NextResponse.redirect(new URL("/", req.url), 307);
  const country = req.headers.get("x-vercel-ip-country") || undefined;
  const ref = refFromHeader(req.headers.get("referer"));
  // Send the visitor on right away; count the click afterwards.
  after(() => track("click", id, { country, ref }));
  return NextResponse.redirect(link.url, 307);
}
