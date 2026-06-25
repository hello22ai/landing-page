import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Voxera dark theme base
        navy: {
          DEFAULT: "#121212",
          800: "#1A1A1A",
          700: "#242424",
        },
        base: "#0E0E0E",
        card: "#161616",
        primary: {
          DEFAULT: "#0099FF",
          50: "#0099FF14",
          100: "#0099FF26",
          600: "#0099FF",
          700: "#007ACC",
        },
        accent: {
          DEFAULT: "#0099FF",
          50: "#0099FF14",
          100: "#0099FF26",
        },
        ember: "#38BDF8",
        surface: "#161616",
        muted: "#999999",
      },
      fontFamily: {
        sans: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.35)",
        "card-hover":
          "0 4px 12px rgba(0, 0, 0, 0.45), 0 16px 40px rgba(0, 153, 255, 0.12)",
        glow: "0 0 60px rgba(0, 153, 255, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
