/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'Roboto': ['Roboto', 'sans-serif'],
      },
    },
    fontFamily: {
      'Roboto': ['Roboto', 'sans-serif'],
      'Poppins': ['Poppins', 'serif'] // Ensure fonts with spaces have " " surrounding it.
    },
    height: {
        '110vh': '110vh',
      },
  },
  plugins: [],
}
