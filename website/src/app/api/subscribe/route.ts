import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Store subscriber in a JSON file
    const subscribersDir = join(process.cwd(), "..", ".tmp");
    const subscribersFile = join(subscribersDir, "subscribers.json");

    await mkdir(subscribersDir, { recursive: true });

    let subscribers: string[] = [];
    try {
      const existing = await readFile(subscribersFile, "utf-8");
      subscribers = JSON.parse(existing);
    } catch {
      // File doesn't exist yet
    }

    if (subscribers.includes(email)) {
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }

    subscribers.push(email);
    await writeFile(subscribersFile, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
