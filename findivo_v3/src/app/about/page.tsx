import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Findivo",
  description: "Learn about Findivo, an AI-powered shopping discovery platform.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-findivo-900 dark:text-cream">About Findivo</h1>
      <div className="mt-8 space-y-4 leading-relaxed text-findivo-600 dark:text-findivo-300">
        <p>Findivo is an AI-powered shopping discovery platform that helps you find clothing and products from online stores, compare prices, spot real discounts, and get the best deal.</p>
        <p>Unlike generic price comparison sites, Findivo acts as your personal shopping assistant. Describe what you want in natural language and we search across retailers to find the best options for you.</p>
        <p>When you click a product and make a purchase, you are redirected to the original store through an affiliate link. The store handles payment and shipping. Findivo may earn a commission at no extra cost to you.</p>
        <p>We are currently in development. Join our waitlist on the homepage to get notified when we launch.</p>
      </div>
    </div>
  );
}
