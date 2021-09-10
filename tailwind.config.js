const {screens} = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // we can't EXTEND screens, have to re-create them: https://github.com/tailwindlabs/tailwindcss/issues/1319
    screens: {
      'min': '310px',
      'xs': '480px',
      ...screens,
    },
    extend: {
      colors: {
        'drkr-white': '#ffffff',
        'drkr-gray': '#f2f2f2',
        'drkr-mid-gray': '#D4D4D4',
        'drkr-black': '#3e3e40',
        'drkr-green': '#2a9d8f',
        'drkr-red': '#B0413E',
      },
      borderWidth: {
        '3': '3px',
      },
      minHeight: {
        '5': '1.25rem',
      },
      minWidth: {
        '10': '2.5rem',
      }
    }
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus']
    },
  },
  plugins: [],
}
