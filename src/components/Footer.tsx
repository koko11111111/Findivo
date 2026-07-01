import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-findivo-200/60 bg-findivo-50 dark:border-findivo-700 dark:bg-findivo-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo size={28} />
            <p className="mt-2 max-w-sm text-sm text-findivo-600 dark:text-findivo-300">
              AI-powered shopping discovery. Compare prices, find real deals,
              and shop smarter.
            </p>
          </div>
          <div className="flex gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-findivo-600 hover:text-findivo-900 dark:text-findivo-300 dark:hover:text-cream">
                About
              </Link>
              <Link href="/privacy" className="text-findivo-600 hover:text-findivo-900 dark:text-findivo-300 dark:hover:text-cream">
                Privacy Policy
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:findivo.support@gmail.com"
                className="text-findivo-600 hover:text-findivo-900 dark:text-findivo-300 dark:hover:text-cream"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-findivo-200/60 pt-6 text-xs leading-relaxed text-findivo-500 dark:border-findivo-700 dark:text-findivo-400">
          <strong>Affiliate disclosure:</strong> Findivo participates in
          affiliate programs. When you click a product link and make a purchase,
          we may earn a commission at no extra cost to you. Prices and
          availability are subject to change. We only link to retailers we
          trust.
        </p>

        <p className="mt-4 text-xs text-findivo-400">
          © {new Date().getFullYear()} Findivo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
