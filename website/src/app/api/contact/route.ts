import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  process.env.GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbwRqDGR2NILTco1-anFhhjJHSD9faoNwpxWbsSgW4_4ju7Q-8iYbvrKZLDQ1G1mcWlJXA/exec";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { name, email, business, service, message } = data;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send to Google Sheets
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        business: business || "Not specified",
        service,
        message,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
