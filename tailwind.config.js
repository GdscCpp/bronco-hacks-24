/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  plugins: [],
};
