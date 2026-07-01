import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  try {
    const state = crypto.randomBytes(32).toString("hex");
    const scope = "openid profile email";
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`;

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.append("client_id", process.env.GOOGLE_CLIENT_ID || "");
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", scope);
    authUrl.searchParams.append("state", state);
    authUrl.searchParams.append("access_type", "offline");
    authUrl.searchParams.append("prompt", "consent");

    // Create response with redirect
    const response = NextResponse.redirect(authUrl.toString());

    // Set state cookie (httpOnly, secure, SameSite)
    response.cookies.set("google_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 10 * 60, // 10 minutes
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[google-oauth] Login error:", error);
    return NextResponse.json({ error: "OAuth login failed" }, { status: 500 });
  }
}
