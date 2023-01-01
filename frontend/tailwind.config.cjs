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
      content: {
        'fire': "url('/assets/fire_circle2.png')",
        'water': "url('/assets/water_circle2.png')"
      },
    },
    keyframes: {
      wiggle: {
        "0%, 100%": { transform: "rotate(-1deg)" },
        "50%": { transform: "rotate(1deg)" }
      }
    },
    animation: {
      wiggle: "wiggle 200ms ease-in-out"
    }
  },
  plugins: [],
}