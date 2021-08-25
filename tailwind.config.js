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
        'drkr-dark-green': '#264653',
        'drkr-green': '#2a9d8f',
        'drkr-yellow': '#e9c46a',
        'drkr-orange': '#f4a261',
        'drkr-red': '#e76f51',
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
