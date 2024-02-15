/** @type {import('tailwindcss').Config} */
export default {
  content: ['./node_modules/preline/preline.js'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    }
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.animate-press': {
          transition: 'transform 0.1s ease'
        },
        '.animate-press:active': {
          transform: 'scale(0.95)'
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ]
}
