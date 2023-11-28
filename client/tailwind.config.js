/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}', './node_modules/flowbite/**/*.js'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
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
      gray: {
        50: '#f6f6f6',
        100: '#e7e7e7',
        200: '#d1d1d1',
        300: '#b0b0b0',
        400: '#888888',
        500: '#6d6d6d',
        600: '#5d5d5d',
        700: '#4f4f4f',
        800: '#454545',
        900: '#3d3d3d',
        950: '#050505',
      },
    },
    fontSize: {
      xs: [
        '10px',
        {
          lineHeight: '9.6px',
        },
      ],
      sm: [
        '12px',
        {
          lineHeight: '14.5px',
        },
      ],
      base: [
        '16px',
        {
          lineHeight: '24px',
        },
      ],
      md: [
        '20px',
        {
          lineHeight: '24px',
        },
      ],
      lg: [
        '24px',
        {
          lineHeight: '29px',
        },
      ],
      xl: [
        '32px',
        {
          lineHeight: '38px',
        },
      ],
      '2xl': [
        '48px',
        {
          lineHeight: '57px',
        },
      ],
      '3xl': [
        '56px',
        {
          lineHeight: '67px',
        },
      ],
      '4xl': [
        '64px',
        {
          lineHeight: '77px',
        },
      ],
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('flowbite/plugin')],
};
