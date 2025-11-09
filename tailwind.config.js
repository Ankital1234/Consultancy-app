/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 600ms ease-out both'
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0,0,0,0.06)',
        softlg: '0 10px 25px rgba(0,0,0,0.10)'
      }
    },
  },
  plugins: [],
}
