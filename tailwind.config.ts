import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      primary: {
        900: "#212B34",
        800: "#2A3642",
        700: "#364455",
        600: "#354E64",
        500: "#3B5E81",
        400: "#3F6489",
        300: "#3E729A",
      },
      secondary: {
        500: "#3ABEB8",
      },
      territary: {
        500: "#47ABE0",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
  safelist: [
    {
      pattern:
        /.*(bg|text|border)-(primary|secondary|grey|negative|positive)-(100|200|300|400|500|600|700|800|900).*/,
    },
  ],
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
