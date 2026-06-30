"use client";

import Image from "next/image";

export type Product = {
  id: string; title: string; brand: string; price: number; originalPrice: number | null;
  discount: number | null; image: string; store: string; rating: number | null;
  reviews: number | null; url: string; shipping: string | null;
};

export function ProductCard({ product }: { product: Product }) {
  const dealScore = product.discount && product.discount >= 50 ? { label: "Hot deal", color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" }
    : product.discount && product.discount >= 30 ? { label: "Great deal", color: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" }
    : product.discount && product.discount >= 15 ? { label: "Good deal", color: "bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300" } : null;

  return (
    <div onClick={() => window.open(`/api/go?url=${encodeURIComponent(product.url)}&store=${encodeURIComponent(product.store)}`, "_blank")}
      className="group cursor-pointer rounded-2xl border border-findivo-200/60 bg-cream-card transition hover:border-accent-300 hover:shadow-lg dark:border-findivo-700 dark:bg-findivo-800">
      <div className="relative overflow-hidden rounded-t-2xl bg-findivo-50 dark:bg-findivo-900">
        <div className="relative h-52 w-full">
          {product.image ? (
            <Image src={product.image} alt={product.title} fill className="object-contain p-4 transition group-hover:scale-105" sizes="25vw" />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl">🛍️</div>
          )}
        </div>
        {product.discount && product.discount > 0 && (
          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">-{product.discount}%</div>
        )}
        {dealScore && <div className={`absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-bold ${dealScore.color}`}>{dealScore.label}</div>}
      </div>
      <div className="p-4">
        {product.brand && <p className="mb-1 text-xs font-medium uppercase tracking-wide text-accent-600 dark:text-accent-400">{product.brand}</p>}
        <h3 className="line-clamp-2 text-sm font-medium text-findivo-900 dark:text-cream">{product.title}</h3>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-findivo-900 dark:text-cream">${product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-findivo-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        {product.rating && (
          <div className="mt-2 flex items-center gap-1">
            <span className="text-accent-400">★</span>
            <span className="text-xs text-findivo-600 dark:text-findivo-300">{product.rating.toFixed(1)}{product.reviews && ` (${product.reviews.toLocaleString()})`}</span>
          </div>
        )}
        <div className="mt-3 flex items-center justify-between border-t border-findivo-100 pt-3 dark:border-findivo-700">
          <span className="text-xs text-findivo-500">{product.store}</span>
          {product.shipping && <span className="text-xs text-green-600 dark:text-green-400">{product.shipping}</span>}
        </div>
      </div>
    </div>
  );
}
