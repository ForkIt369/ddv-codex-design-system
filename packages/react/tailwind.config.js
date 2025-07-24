/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ddv-bigsis': '#00D4FF',
        'ddv-bro': '#FF9500',
        'ddv-lilsis': '#D946EF',
        'ddv-cbo': '#30D158',
      },
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
        '9': '72px',
        '10': '80px',
        '11': '88px',
        '12': '96px',
      },
      transitionDuration: {
        '280': '280ms',
        '560': '560ms',
        '1120': '1120ms',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'draw-line': 'draw-line 2s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'draw-line': {
          'from': { strokeDashoffset: '1000' },
          'to': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}