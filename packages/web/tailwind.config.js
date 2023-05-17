/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.tsx",
    "./lib/**/*.tsx",
    "./components/**/*.tsx",
    "./icons/**/*.tsx",
    "./app/**/*.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      mobile: "576px",
      tablet: "768px",
      desktop: "1200px",
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
