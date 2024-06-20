/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik"],
      },

      colors: {
        primary: {
          grey: "#888888",
          green: "#00B386",
          black : '#1F1F1F',
          grey2 : '#ECECEC'
        },
        accent: {
          black: "#1D1D1D",
          white: "#FFFFFF",
          purple: "#6B79EF",
          green: "#35AB80",
          pink: "#FF5797",
          grey: "#4A4A4A",
        },
      },
    },
  },
  plugins: [],
}