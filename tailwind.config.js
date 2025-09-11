/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f7ff",
          100: "#e6efff",
          200: "#c0d8ff",
          300: "#99c0ff",
          400: "#4d91ff",
          500: "#0062ff",
          600: "#0058e6",
          700: "#0045b3",
          800: "#003380",
          900: "#002266"
        }
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      boxShadow: { card: "0 6px 20px rgba(0,0,0,0.06)" },
      keyframes: { slideup: { "0%": { transform: "translateY(8px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } } },
      animation: { "slide-up": "slideup .25s ease-out" }
    }
  },
  plugins: []
};
