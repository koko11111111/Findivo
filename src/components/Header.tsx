import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "./LogoutButton";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export async function Header() {
  const user = await getCurrentUser();
  return (
    <header className="sticky top-0 z-50 border-b border-findivo-200/60 bg-cream/90 backdrop-blur-md dark:border-findivo-700 dark:bg-findivo-900/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/search" className="hidden text-findivo-600 transition hover:text-findivo-900 dark:text-findivo-300 dark:hover:text-cream sm:inline">Search</Link>
          <Link href="/about" className="hidden text-findivo-600 transition hover:text-findivo-900 dark:text-findivo-300 dark:hover:text-cream sm:inline">About</Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-findivo-600 dark:text-findivo-300 sm:inline">Hi, {user.displayName ?? user.email.split("@")[0]}</span>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-lg px-3 py-1.5 text-sm text-findivo-600 transition hover:text-findivo-900 dark:text-findivo-300 dark:hover:text-cream">Sign in</Link>
              <Link href="/signup" className="rounded-lg bg-accent-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-accent-700">Sign up</Link>
            </div>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
