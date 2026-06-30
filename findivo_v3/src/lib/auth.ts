import { cookies } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(hash).toString("hex");
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return (await hashPassword(password)) === hash;
}

export async function createSession(userId: string) {
  const cookieStore = await cookies();
  const sessionData = Buffer.from(JSON.stringify({ userId, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString("base64");
  cookieStore.set("findivo_session", sessionData, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", maxAge: 7 * 24 * 60 * 60, path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("findivo_session");
  if (!session) return null;
  try {
    const data = JSON.parse(Buffer.from(session.value, "base64").toString());
    if (data.exp < Date.now()) return null;
    return data as { userId: string; exp: number };
  } catch { return null; }
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session || !db) return null;
  const user = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
  return user[0] ?? null;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("findivo_session");
}
