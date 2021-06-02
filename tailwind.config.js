module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'drkr-white': '#fffaf0',
        'drkr-black': '#3c3c3c',
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
