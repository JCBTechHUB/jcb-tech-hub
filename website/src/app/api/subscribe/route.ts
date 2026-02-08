import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  process.env.GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbwRqDGR2NILTco1-anFhhjJHSD9faoNwpxWbsSgW4_4ju7Q-8iYbvrKZLDQ1G1mcWlJXA/exec";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Send to Google Sheets (Subscribers tab)
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "subscribe",
        email,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
