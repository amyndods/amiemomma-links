import { NextRequest, NextResponse } from "next/server";
import { track } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country") || undefined;
  await track("view", "page", { country });
  return new NextResponse(null, { status: 204 });
}
