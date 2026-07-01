"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Login failed"); return; }
      router.push("/search");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex justify-center">
            <Logo withWordmark={false} size={44} />
          </Link>
          <h1 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-findivo-900 dark:text-cream">Welcome back</h1>
          <p className="mt-1 text-sm text-findivo-500">Sign in to your Findivo account</p>
        </div>

        {/* Google Sign-In */}
        <div className="mb-6">
          <GoogleSignInButton />
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-findivo-200 dark:border-findivo-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-cream px-2 text-findivo-500 dark:bg-findivo-900 dark:text-findivo-400">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-findivo-700 dark:text-findivo-300">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@email.com" className="w-full rounded-xl border border-findivo-200 bg-cream-card px-4 py-3 text-sm text-findivo-900 outline-none ring-accent-400 focus:ring-2 dark:border-findivo-700 dark:bg-findivo-800 dark:text-cream" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-findivo-700 dark:text-findivo-300">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full rounded-xl border border-findivo-200 bg-cream-card px-4 py-3 text-sm text-findivo-900 outline-none ring-accent-400 focus:ring-2 dark:border-findivo-700 dark:bg-findivo-800 dark:text-cream" />
          </div>
          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-accent-600 py-3 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:opacity-60">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-findivo-500">
          Do not have an account?{" "}
          <Link href="/signup" className="font-medium text-accent-600 hover:underline dark:text-accent-400">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
