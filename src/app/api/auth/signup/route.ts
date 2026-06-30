import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, createSession } from "@/lib/auth";

const signupSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(100),
  displayName: z.string().min(2).max(50).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    const { email, password, displayName } = parsed.data;
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const existing = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
    if (existing.length > 0) return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    const passwordHash = await hashPassword(password);
    const [user] = await db.insert(users).values({ email: email.toLowerCase(), passwordHash, displayName: displayName ?? email.split("@")[0] }).returning();
    await createSession(user.id);
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, displayName: user.displayName } });
  } catch { return NextResponse.json({ error: "Something went wrong" }, { status: 500 }); }
}
