import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Work sans", "sans-serif"],
        secondary: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#172c56",
        secondary: "#4361ee",
      },
    },
  },
  plugins: [flowbiteReact],
};
