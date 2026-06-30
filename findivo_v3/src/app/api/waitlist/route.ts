import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { waitlist } from "@/db/schema";
import { getWaitlistRateLimit } from "@/lib/ratelimit";
import { sendWaitlistConfirmation } from "@/lib/resend";

const emailSchema = z.object({
  email: z.string().email().max(255),
});

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous"
  );
}

async function parseEmail(request: Request): Promise<string | null> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body: unknown = await request.json();
    const parsed = emailSchema.safeParse(body);
    return parsed.success ? parsed.data.email.toLowerCase().trim() : null;
  }

  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const formData = await request.formData();
    const parsed = emailSchema.safeParse({ email: formData.get("email") });
    return parsed.success ? parsed.data.email.toLowerCase().trim() : null;
  }

  return null;
}

export async function POST(request: Request) {
  const email = await parseEmail(request);
  if (!email) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const ip = getClientIp(request);
  const rateLimit = getWaitlistRateLimit();
  if (rateLimit) {
    const { success } = await rateLimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }
  }

  if (db) {
    try {
      await db.insert(waitlist).values({ email }).onConflictDoNothing();
    } catch (err) {
      console.error("[waitlist] DB insert failed:", err);
    }
  }

  try {
    await sendWaitlistConfirmation(email);
  } catch (err) {
    console.error("[waitlist] Email failed:", err);
  }

  return NextResponse.json({ ok: true, message: "You're on the list!" });
}
