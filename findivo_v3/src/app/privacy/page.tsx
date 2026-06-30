import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Findivo",
  description: "Findivo privacy policy and data practices.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-findivo-900 dark:text-cream">Privacy Policy</h1>
      <p className="mt-2 text-sm text-findivo-500">Last updated: June 2025</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-findivo-600 dark:text-findivo-300">
        <section>
          <h2 className="text-base font-semibold text-findivo-900 dark:text-cream">What we collect</h2>
          <p className="mt-2">When you join our waitlist, we collect your email address. When you use Findivo, we may collect search queries, saved products, and basic usage data to improve our service.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-findivo-900 dark:text-cream">Affiliate links</h2>
          <p className="mt-2">Findivo participates in affiliate programs including Amazon Associates. When you click product links, we may receive a commission. We do not sell your personal data to third parties.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-findivo-900 dark:text-cream">Your rights</h2>
          <p className="mt-2">You can request deletion of your data at any time by emailing <a href="mailto:hello@findivo.com" className="text-accent-600 underline dark:text-accent-400">hello@findivo.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
