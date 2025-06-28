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
      spacing: {
        'safe-area-inset-top': 'env(safe-area-inset-top)',
        'safe-area-inset-right': 'env(safe-area-inset-right)',
        'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
        'safe-area-inset-left': 'env(safe-area-inset-left)',
      },
      minHeight: {
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
      },
      height: {
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
        'safe-area-inset-top': 'env(safe-area-inset-top)',
        'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
      },
      screens: {
        'xs': '475px',
        'touch': { 'raw': '(hover: none) and (pointer: coarse)' },
        'hover': { 'raw': '(hover: hover) and (pointer: fine)' },
      },
      fontSize: {
        'mobile-xs': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.025em' }],
        'mobile-sm': ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.01em' }],
        'mobile-base': ['1rem', { lineHeight: '1.4' }],
        'mobile-lg': ['1.125rem', { lineHeight: '1.4' }],
        'mobile-xl': ['1.25rem', { lineHeight: '1.3' }],
        'mobile-2xl': ['1.5rem', { lineHeight: '1.25' }],
        'mobile-3xl': ['1.875rem', { lineHeight: '1.2' }],
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
    function({ addUtilities }) {
      const newUtilities = {
        '.safe-area-inset-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-area-inset-right': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        '.safe-area-inset-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.safe-area-inset-left': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.touch-manipulation': {
          'touch-action': 'manipulation',
        },
      };
      addUtilities(newUtilities);
    }
  ],
};