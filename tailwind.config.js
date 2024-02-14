/** @type {import('tailwindcss').Config} */
export default {
  content: ['./node_modules/preline/preline.js'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif']
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      colors: {
        darkBlue: '#0a0f19',
        midnightBlue: '#0e1727',
        softMidnightBlue: '#26334F',
        softBlue: '#a4c1e1',
        mutedBlue: '#87a0bc'
      }
    }
  },
  plugins: [require('preline/plugin')]
}
