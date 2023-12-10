import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CustomDateRangePicker = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [numberInput, setNumberInput] = useState(0)

  const handleStartDateChange = (date) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
  }

  const handleNumberInputChange = (e) => {
    const value = parseInt(e.target.value, 10)
    setNumberInput(value || 0)
  }

  return (
    <div
      className="container flex items-center gap-12"
      style={{ width: '1248px', height: '56px' }}
    >
      {/* Start Date Picker */}
      <div className="relative flex-1">
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
          className="p- block w-full rounded-xl border border-primary-300 bg-white px-6 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          placeholderText="Select date start"
        />
        <svg
          className="h-4 w-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      </div>

      <div className=" flex-1 ">
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
          className=" relative block w-full rounded-xl border border-primary-300 bg-white px-6 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          placeholderText="Select date end"
        />
        <svg
          className="absolute right-4 top-4 h-4 w-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      </div>

      <div className="relative flex-1">
        <div className="flex items-center">
          <input
            type="number"
            id="numberInput"
            value={numberInput}
            onChange={handleNumberInputChange}
            className="block w-full rounded-xl border border-primary-300 bg-white px-6 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          />
          <div className="pointer-events-none absolute inset-x-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomDateRangePicker
