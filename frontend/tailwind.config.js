/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        red: {
          50: '#fdf3f4',
          100: '#fbe4e6',
          200: '#f6ced2',
          300: '#efacb4',
          400: '#e37a89',
          500: '#d2485e',
          600: '#b72c44',
          700: '#992034',
          800: '#801d2e',
          900: '#6c1c2b',
          950: '#5A0B14', // Deep Velvet Red
        },
        teal: {
          50: '#f0fdf7',
          100: '#dcfceb',
          200: '#bbf7d9',
          300: '#86efc0',
          400: '#4ade9e',
          500: '#22c57e',
          600: '#16a365',
          700: '#158051',
          800: '#146542',
          900: '#125338',
          950: '#0A3F33', // Deep Satin Green
        }
      }
    },
  },
  plugins: [],
}
