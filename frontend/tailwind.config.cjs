/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'fire-button': "url('/assets/fire_circle2.png')",
        'water-button': "url('/assets/water_circle2.png')",
      },
    },
  },
  plugins: [],
}