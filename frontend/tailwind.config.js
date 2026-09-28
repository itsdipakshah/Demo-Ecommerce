/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      colors: {
        ink: "#14151A",
        paper: "#FDFDFB",
        muted: "#6B6F76",
        line: "#E4E3DE",
        moss: {
          DEFAULT: "#2F6F4F",
          dark: "#204F38",
          light: "#E4EFE8",
        },
        sand: "#EFE6D2",
        clay: "#C1443C",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "14px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,21,26,0.06), 0 1px 1px rgba(20,21,26,0.04)",
      },
    },
  },
  plugins: [],
}
