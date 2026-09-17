import { NextRequest, NextResponse } from "next/server";
import { addWaitlistEntry } from "@/lib/waitlist";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { email?: string; platform?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = await addWaitlistEntry({
    email: body.email || "",
    platform: body.platform,
    source: body.source,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  if (result.duplicate) {
    return NextResponse.json({
      status: "duplicate",
      message: "You're already on the list.",
    });
  }

  return NextResponse.json({
    status: "ok",
    message: "You're on the list. We'll email when Hookline opens.",
  });
}
