"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, displayName }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Signup failed"); return; }
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
          <h1 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-findivo-900 dark:text-cream">Create account</h1>
          <p className="mt-1 text-sm text-findivo-500">Start finding better deals today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-findivo-700 dark:text-findivo-300">Name</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" className="w-full rounded-xl border border-findivo-200 bg-cream-card px-4 py-3 text-sm text-findivo-900 outline-none ring-accent-400 transition focus:ring-2 dark:border-findivo-700 dark:bg-findivo-800 dark:text-cream" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-findivo-700 dark:text-findivo-300">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@email.com" className="w-full rounded-xl border border-findivo-200 bg-cream-card px-4 py-3 text-sm text-findivo-900 outline-none ring-accent-400 transition focus:ring-2 dark:border-findivo-700 dark:bg-findivo-800 dark:text-cream" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-findivo-700 dark:text-findivo-300">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder="At least 8 characters" className="w-full rounded-xl border border-findivo-200 bg-cream-card px-4 py-3 text-sm text-findivo-900 outline-none ring-accent-400 transition focus:ring-2 dark:border-findivo-700 dark:bg-findivo-800 dark:text-cream" />
          </div>
          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-accent-600 py-3 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:opacity-60">
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-findivo-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent-600 hover:underline dark:text-accent-400">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
