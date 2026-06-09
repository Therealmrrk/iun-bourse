/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1D4492',
          light:   '#1D4492',
          mid:     '#1D4492',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E2C47A',
          pale:    '#F5EDD5',
          dark:    '#A8872D',
        },
        cream: '#F5F2EB',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:    ['Nunito Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
