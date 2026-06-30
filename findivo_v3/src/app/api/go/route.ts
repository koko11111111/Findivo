import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const store = searchParams.get("store") ?? "unknown";
  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });
  let finalUrl = url;
  const amazonTag = process.env.AMAZON_ASSOCIATE_TAG;
  if (amazonTag && url.includes("amazon.com")) {
    const parsed = new URL(url);
    parsed.searchParams.set("tag", amazonTag);
    finalUrl = parsed.toString();
  }
  return NextResponse.redirect(finalUrl);
}
