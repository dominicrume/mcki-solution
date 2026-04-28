import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#EEF3FA",
          100: "#D0DFF2",
          200: "#A2BFE4",
          300: "#6B9BD3",
          400: "#3A72B8",
          500: "#0A1628",   // primary deep navy
          600: "#08111F",
          700: "#060C16",
          800: "#04080E",
          900: "#020406",
        },
        gold: {
          50:  "#FBF6E6",
          100: "#F5E9B8",
          200: "#EDD688",
          300: "#C9A84C",   // refined professional gold
          400: "#B08C32",
          500: "#8A6B21",
        },
        // Keep sapphire as alias to navy for backwards compat
        sapphire: {
          50:  "#EEF3FA",
          100: "#D0DFF2",
          200: "#A2BFE4",
          300: "#6B9BD3",
          400: "#3A72B8",
          500: "#0A1628",
          600: "#08111F",
          700: "#060C16",
          800: "#04080E",
          900: "#020406",
        },
        brand: {
          bg:      "#F8FAFD",
          surface: "#FFFFFF",
          alt:     "#F2F5F9",
          border:  "#E2E8F2",
          text:    "#1A2332",
          muted:   "#64748B",
        },
      },
      fontFamily: {
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        body:    ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #0A1628 0%, #152544 55%, #0A1D3A 100%)",
        "navy-gradient":
          "linear-gradient(135deg, #0A1628 0%, #152544 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, #C9A84C 0%, #EDD688 50%, #C9A84C 100%)",
      },
      animation: {
        "fade-up":   "fadeUp 0.6s ease-out both",
        "fade-in":   "fadeIn 0.5s ease-out both",
        shimmer:     "shimmer 3s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        card:   "0 2px 16px 0 rgba(10,22,40,0.08)",
        "card-hover": "0 8px 32px 0 rgba(10,22,40,0.14)",
        cta:    "0 4px 24px 0 rgba(201,168,76,0.30)",
      },
    },
  },
  plugins: [],
};

export default config;
