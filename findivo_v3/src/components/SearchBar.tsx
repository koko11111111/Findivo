"use client";
import { useState, useEffect } from "react";

type Props = { initialQuery?: string; onSearch: (query: string) => void; loading?: boolean; };

export function SearchBar({ initialQuery = "", onSearch, loading }: Props) {
  const [value, setValue] = useState(initialQuery);
  useEffect(() => { setValue(initialQuery); }, [initialQuery]);
  function handleSubmit(e: React.FormEvent) { e.preventDefault(); onSearch(value); }
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-findivo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder='Try "black hoodie under $50"' className="w-full rounded-xl border border-findivo-200 bg-cream-card py-3 pl-10 pr-4 text-sm text-findivo-900 outline-none ring-accent-400 transition focus:ring-2 dark:border-findivo-700 dark:bg-findivo-800 dark:text-cream" />
      </div>
      <button type="submit" disabled={loading || !value.trim()} className="rounded-xl bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-700 disabled:opacity-60">
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
