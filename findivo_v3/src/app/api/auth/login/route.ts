import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, createSession } from "@/lib/auth";

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    const { email, password } = parsed.data;
    if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
    if (!user || !user.passwordHash) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    await createSession(user.id);
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, displayName: user.displayName } });
  } catch { return NextResponse.json({ error: "Something went wrong" }, { status: 500 }); }
}
