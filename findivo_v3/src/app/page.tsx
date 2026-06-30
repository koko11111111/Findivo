import { SearchDemo } from "@/components/SearchDemo";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex items-center rounded-full border border-accent-300 bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700 dark:border-accent-700 dark:bg-accent-900/30 dark:text-accent-300">
              AI-powered shopping discovery
            </p>
            <h1 className="text-balance font-serif text-4xl font-semibold tracking-tight text-findivo-900 sm:text-5xl lg:text-6xl dark:text-cream">
              Find the best deal,{" "}
              <span className="text-accent-500">
                not just the lowest price
              </span>
            </h1>
            <p className="mt-6 text-pretty text-lg text-findivo-600 dark:text-findivo-300">
              Search products across online stores. Compare prices, spot real
              discounts, and get personalized recommendations — powered by AI.
            </p>
          </div>

          <SearchDemo />

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-findivo-500 dark:text-findivo-400">
            <span>Try: &ldquo;black hoodie under $50&rdquo;</span>
            <span className="hidden sm:inline">·</span>
            <span>&ldquo;Nike shoes size 42&rdquo;</span>
            <span className="hidden sm:inline">·</span>
            <span>&ldquo;graduation outfit under $150&rdquo;</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-findivo-200/60 bg-cream-card py-20 dark:border-findivo-700 dark:bg-findivo-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-semibold tracking-tight text-findivo-900 dark:text-cream sm:text-3xl">
            More than a discount list
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-findivo-600 dark:text-findivo-300">
            Findivo is your AI shopping assistant — built to help you discover,
            compare, and buy smarter.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-findivo-200/60 bg-cream p-6 dark:border-findivo-700 dark:bg-findivo-900"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-findivo-900 dark:text-cream">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-findivo-600 dark:text-findivo-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-findivo-200/60 py-20 dark:border-findivo-700">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-findivo-900 dark:text-cream sm:text-3xl">
            Launching soon
          </h2>
          <p className="mx-auto mt-3 max-w-md text-findivo-600 dark:text-findivo-300">
            We&apos;re building Findivo now. Join the waitlist to get early
            access when we launch.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}

const features = [
  {
    title: "AI Search Assistant",
    description:
      "Describe what you want in plain English. Findivo understands budget, size, brand, and style.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: "Deal Scoring",
    description:
      "Not every sale is a good deal. We analyze price history to spot fake discounts and real savings.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Multi-Store Comparison",
    description:
      "See the same product across retailers side by side — price, shipping, ratings, and availability.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Price Drop Alerts",
    description:
      "Save products to your wishlist and get notified when the price hits your target.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    title: "Personalized Picks",
    description:
      "Set your sizes, favorite brands, and budget. Findivo learns what you like over time.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "Affiliate Transparency",
    description:
      "We earn commission when you buy through our links — at no extra cost to you. Always disclosed.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];
