/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          100: '#179DBA',
          200: '#1AAFDA',
          300: '#02CEFF',
          400: '#80E6FF',
          500: '#E8F7FB',
        },
        "white" : "#FFFFFF",
      },
    },
  },
  plugins: [],
}