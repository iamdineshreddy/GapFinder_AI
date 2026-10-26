import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Study Assistant AI is not configured yet. Add GEMINI_API_KEY in the Render Environment settings." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const question = typeof body.question === "string" ? body.question.trim() : "";
    const context = typeof body.context === "string" ? body.context.slice(0, 18000) : "";

    if (!question) {
      return NextResponse.json({ error: "Please enter a question." }, { status: 400 });
    }

    const prompt = [
      "You are GapFinder AI, a helpful study assistant for students.",
      "Answer clearly and accurately in student-friendly language. Use headings or examples when useful.",
      "If course notes are provided, prioritize them and say when the notes do not contain enough information. Do not invent citations or claim a fact came from the notes unless it is present.",
      context ? `STUDENT'S COURSE NOTES:\n${context}` : "No course notes were supplied. Answer from general knowledge and mention uncertainty when relevant.",
      `STUDENT QUESTION:\n${question}`
    ].join("\n\n");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 1200 }
        }),
        cache: "no-store"
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("Gemini API request failed:", response.status, data?.error?.message || "Unknown API error");
      return NextResponse.json(
        { error: "The AI provider could not answer right now. Check your Gemini API key, model access, and usage limits in Google AI Studio." },
        { status: response.status === 429 ? 429 : 502 }
      );
    }

    const answer = data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("\n")
      .trim();

    if (!answer) {
      return NextResponse.json({ error: "The AI returned an empty answer. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ answer, source: context ? "Gemini AI · your course notes" : "Gemini AI · general knowledge" });
  } catch {
    return NextResponse.json({ error: "Could not process that question. Please try again." }, { status: 500 });
  }
}
