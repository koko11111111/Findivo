"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("findivo-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("findivo-theme", next ? "dark" : "light");
  }

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-findivo-200 bg-cream-card text-findivo-700 transition-colors hover:border-accent-300 dark:border-findivo-700 dark:bg-findivo-800 dark:text-findivo-200 dark:hover:border-accent-600"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="overflow-visible"
      >
        <g
          style={{
            transformOrigin: "12px 12px",
            transition: "transform 600ms cubic-bezier(0.65, 0, 0.35, 1)",
            transform: isDark ? "rotate(40deg)" : "rotate(0deg)",
          }}
        >
          <circle
            cx="12"
            cy="12"
            style={{
              transition: "r 500ms cubic-bezier(0.65, 0, 0.35, 1)",
            }}
            r={isDark ? 9 : 5}
            fill="currentColor"
            className="text-accent-500"
          />
          <circle
            cx="16.5"
            cy="9"
            r="7.2"
            fill="var(--background)"
            style={{
              transition: "opacity 400ms ease, transform 500ms cubic-bezier(0.65, 0, 0.35, 1)",
              opacity: isDark ? 1 : 0,
              transform: isDark ? "translate(0px, 0px)" : "translate(6px, -3px)",
            }}
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="12"
              y1="2.5"
              x2="12"
              y2="4.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="text-accent-500"
              style={{
                transformOrigin: "12px 12px",
                transform: `rotate(${deg}deg)`,
                transition: "opacity 400ms ease, transform 500ms cubic-bezier(0.65, 0, 0.35, 1)",
                opacity: isDark ? 0 : 1,
              }}
            />
          ))}
        </g>
      </svg>
    </button>
  );
}
