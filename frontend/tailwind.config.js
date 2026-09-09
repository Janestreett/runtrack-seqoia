/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        muted2: "rgb(var(--color-muted2) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "system-ui", "sans-serif"],
      },
      fontSize: {
        stat: ["clamp(2rem, 5vw + 1rem, 3.5rem)", { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "600" }],
        "stat-sm": ["clamp(1.5rem, 4vw + 0.5rem, 2.5rem)", { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "600" }],
      },
      maxWidth: {
        app: "1440px",
      },
    },
  },
  plugins: [],
};
