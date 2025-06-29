/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translate(-50%, -60%)', opacity: '0' },
          '100%': { transform: 'translate(-50%, -50%)', opacity: '1' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in-out',
        slideDown: 'slideDown 0.2s ease-in-out',
      }
    },
  },
  plugins: [],
}

