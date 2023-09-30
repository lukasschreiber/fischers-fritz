/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      md: "850px",
    },
    fontFamily: {
      sans: ['Century Gothic', 'ui-sans-serif', 'system-ui', 'sans-serif']
    },
    extend: {
      colors: {
        "fritz-teal": {
          100: '#A5C7CB',
          500: '#5b979e',
          700: '#2f4550',
        }
      }
    },
  },
  plugins: [],
}

