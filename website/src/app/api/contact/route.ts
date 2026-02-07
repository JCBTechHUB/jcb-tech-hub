import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

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

    // Store submission as a JSON file (automation tools can process these)
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const submissionsDir = join(process.cwd(), "..", ".tmp", "submissions");

    await mkdir(submissionsDir, { recursive: true });
    await writeFile(
      join(submissionsDir, `${timestamp}-${name.replace(/\s+/g, "-").toLowerCase()}.json`),
      JSON.stringify(
        {
          name,
          email,
          business: business || "Not specified",
          service,
          message,
          submittedAt: new Date().toISOString(),
        },
        null,
        2
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
