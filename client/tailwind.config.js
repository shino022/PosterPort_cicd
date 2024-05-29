/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {         
    },
    fontFamily: {
      jersey: ['"Jersey 10"', 'sans-serif'],
      antonio:['"Antonio"', 'sans-serif'],
    },
  },
  plugins: [],
}