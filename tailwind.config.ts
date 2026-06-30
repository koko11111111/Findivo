import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        findivo: {
          // slate (structural/neutral brand)
          50: "#F4F5F6",
          100: "#E4E6E9",
          200: "#C7CCD2",
          300: "#A2A9B3",
          400: "#7A828F",
          500: "#566070",
          600: "#3E4858",
          700: "#2B3440",
          800: "#1F2630",
          900: "#1C232C",
        },
        accent: {
          // original teal-green, now the single accent color (replaces amber)
          50: "#f0fdf9",
          100: "#ccfbef",
          200: "#99f6e0",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        cream: {
          DEFAULT: "#FAF8F4",
          card: "#FFFFFB",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
