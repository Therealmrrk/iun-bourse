/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 🛠️ FIXED: Added './src/' so Tailwind accurately scans your file paths
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',       // Fallback path
    './components/**/*.{js,ts,jsx,tsx}',// Fallback path
  ],
  theme: {
    extend: {
      colors: {
        // 🔵 Elegant Navy Spectrum with realistic dynamic depth
        navy: {
          light:   '#315BAA', // Lighter tone for hover states and borders
          mid:     '#224D9C', // Intermediary depth
          DEFAULT: '#1D4492', // Your premium, exact core brand color
          dark:    '#13316B', // Deep contrast text or premium background shading
        },
        gold: {
          light:   '#E2C47A',
          pale:    '#F5EDD5',
          DEFAULT: '#C9A84C',
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
