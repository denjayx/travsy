/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'
],
  theme: {
    extend: {
      boxShadow: {
        btn: '2px 8px 12.7px 0px rgba(0, 152, 205, 0.15);',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
      },
    },
    colors: {
      red: '#D70000',
      white: '#ffffff',
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
        50: '#f6f6f7',
        100: '#efeff0',
        200: '#e1e3e4',
        300: '#cfd0d2',
        400: '#babcbf',
        500: '#a7a8ad',
        600: '#96979c',
        700: '#7e7e84',
        800: '#67676c',
        900: '#565759',
        950: '#323234',
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
  plugins: [
    require('flowbite/plugin')
  ],
}
