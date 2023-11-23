/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}', './node_modules/flowbite/**/*.js'],
  theme: {
    container: {
      center: true,
    },
    extend: {},
    colors: {
      primary: {
        50: '#f0faff',
        100: '#dff5ff',
        200: '#b8edff',
        300: '#79e0ff',
        400: '#32d1fe',
        500: '#07bcf0',
        600: '#0098cd',
        700: '#0079a6',
        800: '#036689',
        900: '#095471',
        950: '#06354b',
      },
    },
    fontSize: {
      xs: '10px',
      sm: '12px',
      base: '16px',
      md: '20px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
      '3xl': '56px',
      '4xl': '64px',
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('flowbite/plugin')],
};
