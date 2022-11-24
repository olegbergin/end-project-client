/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      homeTitle: "'Suez One', serif",
    },
    extend: {
      fontFamily: {
        varela: ["Varela Round", "sans-serif"],
      },
      minWidth: {
        md: "28rem",
      },
      spacing: {
        lessThenAPage: "60vh",
        150: "40rem",
      },
    },
  },
  plugins: [require("tailwindcss-rtl"), require("tailwind-scrollbar-hide")],
};
