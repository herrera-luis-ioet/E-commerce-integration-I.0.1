/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da6ff',
          DEFAULT: '#0078d4',
          dark: '#004c8c',
        },
        secondary: {
          light: '#8c8c8c',
          DEFAULT: '#505050',
          dark: '#303030',
        },
        success: {
          light: '#4caf50',
          DEFAULT: '#2e7d32',
          dark: '#1b5e20',
        },
        warning: {
          light: '#ffb74d',
          DEFAULT: '#ff9800',
          dark: '#f57c00',
        },
        error: {
          light: '#e57373',
          DEFAULT: '#f44336',
          dark: '#d32f2f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      gridTemplateColumns: {
        'product-grid': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}