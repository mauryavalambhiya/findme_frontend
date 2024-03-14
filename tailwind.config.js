/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const { colors: defaultColors } = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      'primary-font' : ['Adamina', 'serif'],
      'logo-font' : ['Joti One', 'serif'],
    },
    extend: {
      // freeNavShadow: {
      //   '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      // },
      colors : {
        ...defaultColors,
        'primary-purple-dark': '#280044',
        'primary-purple-light': '#5E0399',
        'orange' : '#EB602A',
        'btn-green' : '#179470',
        'btn-sky' : '#3080E0',
        'btn-grey' : '#D8D8D8',
        'background-grey' : '#D8D8D8',
        'txt-white' : '#FFFFFF',
        'txt-grey' : '#8D8D8D',
        'txt-grey-dark' : '#747474',
        'txt-grey-light' : '#B3B3B3',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
  ],
}

