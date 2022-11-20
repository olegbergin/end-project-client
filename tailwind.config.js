/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        "varela" : ['Varela Round', 'sans-serif']
      }
    },
  },
  plugins: [require("tailwindcss-rtl"), require("tailwind-scrollbar-hide")],
};
