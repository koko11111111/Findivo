"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";

export type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  image: string;
  store: string;
  rating: number | null;
  reviews: number | null;
  url: string;
  shipping: string | null;
};

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialQ) handleSearch(initialQ);
  }, [initialQ]);

  async function handleSearch(q: string) {
    if (!q.trim()) return;
    setQuery(q);
    setLoading(true);
    setError("");
    setSearched(true);
    setProducts([]);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Search failed");
      setProducts(data.products ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-findivo-50 dark:bg-findivo-900">
      <div className="sticky top-16 z-40 border-b border-findivo-200 bg-cream/90 backdrop-blur dark:border-findivo-700 dark:bg-findivo-900/90">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <SearchBar initialQuery={query} onSearch={handleSearch} loading={loading} />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {searched && !loading && products.length > 0 && (
          <p className="mb-6 text-sm text-findivo-500">
            Found <span className="font-semibold text-findivo-900 dark:text-cream">{products.length}</span> results for{" "}
            <span className="font-semibold text-findivo-900 dark:text-cream">&ldquo;{query}&rdquo;</span>
          </p>
        )}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-findivo-200 bg-cream-card p-4 dark:border-findivo-700 dark:bg-findivo-800">
                <div className="mb-4 h-48 rounded-xl bg-findivo-100 dark:bg-findivo-700" />
                <div className="mb-2 h-4 w-3/4 rounded bg-findivo-100 dark:bg-findivo-700" />
                <div className="mb-2 h-3 w-1/2 rounded bg-findivo-100 dark:bg-findivo-700" />
                <div className="h-5 w-1/3 rounded bg-findivo-100 dark:bg-findivo-700" />
              </div>
            ))}
          </div>
        )}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {searched && !loading && !error && products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-2xl">🔍</p>
            <p className="mt-3 font-semibold">No results found</p>
            <p className="mt-1 text-sm text-findivo-500">Try a different search term</p>
          </div>
        )}
        {!searched && (
          <div className="py-20 text-center">
            <p className="text-4xl">🛍️</p>
            <p className="mt-4 text-xl font-semibold">What are you looking for?</p>
            <p className="mt-2 text-findivo-500">Try: &ldquo;black hoodie under $50&rdquo; or &ldquo;Nike shoes size 42&rdquo;</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["black hoodie under $50", "Nike shoes", "graduation outfit", "wireless headphones"].map((s) => (
                <button key={s} onClick={() => handleSearch(s)} className="rounded-full border border-findivo-200 bg-cream-card px-4 py-2 text-sm text-findivo-600 transition hover:border-accent-300 hover:text-accent-700">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {products.length > 0 && !loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
