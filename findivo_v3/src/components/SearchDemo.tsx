"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchDemo() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <form onSubmit={handleSubmit} className="flex overflow-hidden rounded-2xl border border-findivo-200 bg-cream-card shadow-lg shadow-findivo-900/5 dark:border-findivo-700 dark:bg-findivo-800 dark:shadow-none">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="flex-1 bg-transparent px-5 py-4 text-base text-findivo-900 outline-none placeholder:text-findivo-400 dark:text-cream"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="m-2 rounded-xl bg-accent-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:opacity-60"
        >
          Search
        </button>
      </form>
      <p className="mt-3 text-center text-xs text-findivo-400">
        Search products across multiple stores instantly
      </p>
    </div>
  );
}
