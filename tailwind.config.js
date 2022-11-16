/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'dark-blue': 'hsl(209, 23%, 22%)', //Dark Mode Elements
      'very-dark-blue': 'hsl(207, 26%, 17%)', // Dark Mode Background
      'very-very-dark-blue': 'hsl(200, 15%, 8%)', // Light Mode Text
      'dark-gray': 'hsl(0, 0%, 52%)', // Light Mode Input
      'very-light-gray': 'hsl(0, 0%, 98%)', // Light Mode Background
      'white': 'hsl(0, 0%, 100%)' // Dark Mode Text & Light Mode Elements
    },
    fontWeight: {
      light: 300,
      semibold: 600,
      bold: 800
    },
    screens: {
      'mbl': '375px',
      'tbl-sm': '640px',
      'tbl-md': '768px',
      'tbl-lg': '992px',
      'dsk': '1440px'
    },
    extend: {
      boxShadow: {
        'bottom': '0 4px 6px -6px rgba(0, 0, 0, 0.4)'
      },
      aspectRatio: {
        '4/3': '4 / 3'
      }
    },
  },
  plugins: [],
}