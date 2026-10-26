import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedTypes = new Set([
  "material_saved",
  "assistant_answered",
  "quiz_completed",
  "revision_task_completed",
]);

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { error: "Database is not configured. Add the Supabase environment variables in Render." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const eventType = typeof body.eventType === "string" ? body.eventType : "";
    const title = typeof body.title === "string" ? body.title.trim().slice(0, 200) : "";
    const details = body.details && typeof body.details === "object" && !Array.isArray(body.details)
      ? body.details
      : {};

    if (!allowedTypes.has(eventType)) {
      return NextResponse.json({ error: "Unsupported activity type." }, { status: 400 });
    }

    const response = await fetch(`${url}/rest/v1/study_activity`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ event_type: eventType, title, details }),
      cache: "no-store",
    });

    if (!response.ok) {
      const message = await response.text();
      console.error("Supabase activity insert failed:", response.status, message.slice(0, 500));
      return NextResponse.json({ error: "Could not save activity to the database." }, { status: 502 });
    }

    return NextResponse.json({ saved: true });
  } catch {
    return NextResponse.json({ error: "Could not process the database request." }, { status: 500 });
  }
}
