/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#f5f3fa",
        card: "#ffffff",
        border: "#e7e3ef",
        brand: {
          50: "#f3eefc",
          100: "#e6dbfb",
          200: "#ccb9f5",
          300: "#b197ef",
          400: "#8f6cde",
          500: "#6f4db8",
          600: "#5b3da1",
          700: "#4a327f"
        },
        success: "#13a460",
        danger: "#cc4a4a"
      },
      boxShadow: {
        soft: "0 8px 25px rgba(31, 28, 51, 0.06)"
      }
    }
  },
  plugins: []
};