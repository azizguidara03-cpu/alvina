import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adaptive tokens — switch automatically with .dark class
        cream: "var(--color-cream)",
        champagne: "var(--color-champagne)",
        gold: {
          DEFAULT: "var(--color-gold)",
          dark: "var(--color-gold-dark)",
        },
        charcoal: "var(--color-charcoal)",
        "warm-gray": "var(--color-warm-gray)",
        // Semantic token aliases
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "bg-surface": "var(--bg-primary)",
        "bg-card-surface": "var(--bg-card)",
        "border-main": "var(--border-color)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-jost)", "sans-serif"],
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      fontSize: {
        "hero-xl": "clamp(3.5rem, 8vw, 7rem)",
        "hero-lg": "clamp(2.2rem, 6vw, 3.5rem)",
      },
      animation: {
        "float-up": "floatUp 4s ease-in infinite",
      },
    },
  },
  plugins: [],
};
export default config;
