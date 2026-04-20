import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        "near-black": "#141413",
        terracotta: "#c96442",
        "terracotta-hover": "#b85a3a",
        coral: "#d97757",

        // Surfaces & Backgrounds
        parchment: "#f5f4ed",
        ivory: "#faf9f5",
        "warm-sand": "#e8e6dc",
        "dark-surface": "#30302e",
        "deep-dark": "#141413",

        // Neutrals & Text
        "charcoal-warm": "#4d4c48",
        "olive-gray": "#5e5d59",
        "stone-gray": "#87867f",
        "dark-warm": "#3d3d3a",
        "warm-silver": "#b0aea5",

        // Borders
        "border-cream": "#f0eee6",
        "border-warm": "#e8e6dc",
        "border-dark": "#30302e",

        // Semantic
        "error-crimson": "#b53333",
        "focus-blue": "#3898ec",
        "success-sage": "#5a7a5a",
      },
      fontFamily: {
        serif: ["Georgia", "'Times New Roman'", "serif"],
        sans: ["system-ui", "-apple-system", "sans-serif"],
        mono: ["'Courier New'", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "32px",
        full: "9999px",
      },
      boxShadow: {
        ring: "0px 0px 0px 1px rgba(0,0,0,0.08)",
        whisper: "rgba(0,0,0,0.05) 0px 4px 24px",
        lifted: "rgba(0,0,0,0.12) 0px 8px 32px",
        "nav-scroll": "rgba(0,0,0,0.05) 0px 2px 12px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
