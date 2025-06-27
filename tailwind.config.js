/** @type {import('tailwindcss').Config} */
const colors = {
  olive: {
    dark: '#18230F',
    light: '#38452D',
  },
  peach: {
    dark: '#C5705D',
    light: '#D5A499',
  },
  beige: {
    dark: '#DFD3C3',
    light: '#F8EDE3',
  },
};

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#FFFFFF',
          dark: colors.olive.dark,
        },
        accent: {
          peach: colors.peach.light,
          'peach-dark': colors.peach.dark,
          olive: colors.olive.light,
          'olive-dark': colors.olive.dark,
        },
        neutral: {
          beige: colors.beige.light,
          'beige-dark': colors.beige.dark,
        },
        success: colors.olive.light,
        danger: colors.peach.dark,
        disabled: '#ccc',
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
};