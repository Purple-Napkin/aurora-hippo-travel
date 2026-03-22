import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Pick up utilities used in @aurora-studio/starter-core (e.g. CatalogueFilters sidebar md:block)
    "./node_modules/@aurora-studio/starter-core/dist/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      colors: {
        aurora: {
          bg: "var(--aurora-bg, #fffbf7)",
          surface: "var(--aurora-surface, #ffffff)",
          "surface-hover": "var(--aurora-surface-hover, #fff1e6)",
          border: "var(--aurora-border, #f3e8dd)",
          accent: "var(--aurora-accent, #ea580c)",
          primary: "var(--aurora-primary, #c2410c)",
          "primary-dark": "var(--aurora-primary-dark, #9a3412)",
          muted: "var(--aurora-muted, #78716c)",
          text: "var(--aurora-text, #1c1917)",
        },
      },
      borderRadius: {
        container: "20px",
        card: "16px",
        component: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
