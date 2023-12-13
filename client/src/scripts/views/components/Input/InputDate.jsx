/* eslint-disable react/prop-types */
import 'react-datepicker/dist/react-datepicker.css'
import { Datepicker } from 'flowbite-react'

const customTheme = {
  root: {
    base: 'relative',
  },
  popup: {
    root: {
      base: 'absolute top-10 z-50 block pt-2',
      inline: 'relative top-0 z-auto',
      inner: 'inline-block rounded-lg bg-white p-4 shadow-lg',
    },
    header: {
      base: '',
      title: 'px-2 py-3 text-center font-semibold text-gray-900',
      selectors: {
        base: 'flex justify-between mb-2',
        button: {
          base: 'text-sm rounded-lg text-gray-900 bg-white font-semibold py-2.5 px-5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch',
          prev: '',
          next: '',
          view: '',
        },
      },
    },
    view: {
      base: 'p-1',
    },
    footer: {
      base: 'flex mt-2 space-x-2',
      button: {
        base: 'w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-primary-300',
        today: 'bg-primary-500 text-white hover:bg-primary-800',
        clear:
          'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100',
      },
    },
  },
  views: {
    days: {
      header: {
        base: 'grid grid-cols-7 mb-1',
        title:
          'dow h-6 text-center text-sm font-medium leading-6 text-gray-500',
      },
      items: {
        base: 'grid w-64 grid-cols-7',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100',
          selected: 'bg-primary-500 text-white hover:bg-primary-600',
          disabled: 'text-gray-500',
        },
      },
    },
    months: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100',
          selected: 'bg-primary-500 text-white hover:bg-primary-600',
          disabled: 'text-gray-500',
        },
      },
    },
    years: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-gray-100 text-gray-900',
          selected: 'bg-primary-500 text-white hover:bg-primary-600',
          disabled: 'text-gray-500',
        },
      },
    },
    decades: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-gray-100 text-gray-900',
          selected: 'bg-primary-500 text-white hover:bg-primary-600',
          disabled: 'text-gray-500',
        },
      },
    },
  },
}

const InputDate = ({ limitMaxDate, limitMinDate, placeholder }) => {
  return (
    <Datepicker
      theme={customTheme}
      language="id"
      maxDate={limitMaxDate}
      minDate={limitMinDate}
      autoHide={false}
      placeholder={placeholder}
    />
  )
}

export default InputDate
