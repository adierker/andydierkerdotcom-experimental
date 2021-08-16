module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'drkr-white': '#ffffff', // #e7e1d3 matches the image
        'drkr-black': '#3e3e40',
        'drkr-dark-green': '#264653',
        'drkr-green': '#2a9d8f',
        'drkr-yellow': '#e9c46a',
        'drkr-orange': '#f4a261',
        'drkr-red': '#e76f51',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
