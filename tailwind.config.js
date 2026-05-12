/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      colors: {
        bg: '#FFFFFF',
        surface: '#F4F4F4',
        card: '#F9F9F9',
        accent: '#0E1140',
        'accent-light': '#1a2070',
        pop: '#131313',
        muted: '#888888',
        border: '#E0E0E0',
        text: '#131313',
      },
    },
  },
  plugins: [],
}