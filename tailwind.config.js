/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        'base': "#252F3D",
        'input-label': "#333333",
        'primary': "#127C95"
      },
      fontFamily: {
        'lato': ['lato', 'sans-serif'],
        'sans': ['lato', 'sans-serif']
      }
    },
  },
  plugins: [],
})

