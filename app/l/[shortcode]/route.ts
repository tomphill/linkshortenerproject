import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  const { shortcode } = await params;

  try {
    // Find the link by shortcode
    const [link] = await db
      .select()
      .from(links)
      .where(eq(links.shortCode, shortcode))
      .limit(1);

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Validate URL scheme to prevent open redirect attacks
    let url: URL;
    try {
      url = new URL(link.originalUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL stored in database" },
        { status: 400 },
      );
    }

    // Only allow http and https schemes
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return NextResponse.json(
        { error: "Invalid URL scheme" },
        { status: 400 },
      );
    }

    // Redirect to the original URL
    return NextResponse.redirect(link.originalUrl, 301);
  } catch (error) {
    console.error("Error redirecting:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
