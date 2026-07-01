import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code) {
      return NextResponse.json({ error: "No authorization code" }, { status: 400 });
    }

    // Verify state matches (CSRF protection)
    const cookies = request.headers.get("cookie") || "";
    const stateCookie = cookies
      .split("; ")
      .find((c) => c.startsWith("google_oauth_state="))
      ?.split("=")[1];

    if (state !== stateCookie) {
      return NextResponse.json({ error: "Invalid state parameter" }, { status: 400 });
    }

    // Exchange code for token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      console.error("[google-oauth] Token exchange failed:", tokenData);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=token_exchange_failed`);
    }

    const accessToken = tokenData.access_token;

    // Get user info from Google
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const googleUser = await userResponse.json();
    if (!userResponse.ok) {
      console.error("[google-oauth] User info fetch failed:", googleUser);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=user_info_failed`);
    }

    // Find or create user in database
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const email = googleUser.email.toLowerCase();
    let [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) {
      // Create new user
      const result = await db
        .insert(users)
        .values({
          email,
          displayName: googleUser.name,
          emailVerified: googleUser.verified_email,
          role: "user",
        })
        .returning();
      user = result[0];
    }

    // Create session
    await createSession(user.id);

    // Redirect to search page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/search`);
  } catch (error) {
    console.error("[google-oauth] Callback error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=callback_error`);
  }
}
