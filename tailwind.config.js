/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Work sans', 'sans-serif'],
        'secondary': ["Inter", 'sans-serif']
      },
      colors: {
        'primary': '#172c56',
        'secondary': '#4361ee'
      }
    },
  },
  plugins: [],
}