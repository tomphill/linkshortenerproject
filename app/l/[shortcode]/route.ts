import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
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

    // Redirect to the original URL
    return NextResponse.redirect(link.originalUrl, 301);
  } catch (error) {
    console.error("Error redirecting:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
