import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090a",
        foreground: "#f4f4f5",
        muted: "#a1a1aa",
        line: "rgba(255, 255, 255, 0.09)",
        panel: "#0d0e10",
        accent: "#8b5cf6",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "sans-serif",
        ],
        mono: [
          "\"SFMono-Regular\"",
          "Consolas",
          "\"Liberation Mono\"",
          "monospace",
        ],
      },
      boxShadow: {
        glow: "0 0 60px rgba(139, 92, 246, 0.14)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
