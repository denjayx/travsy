import { FaAngleDown } from 'react-icons/fa'
import { useState } from 'react'

/* eslint-disable react/prop-types */
const InputSelect = ({ label, options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState('')

  const handleChange = (event) => {
    const value = event.target.value
    setSelectedValue(value)

    if (onSelect) {
      onSelect(value)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <div className="relative">
        <select
          className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 outline-none focus:outline-none focus:ring focus:ring-primary-300"
          value={selectedValue}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FaAngleDown className="absolute right-4 top-4 text-gray-500" />
      </div>
    </div>
  )
}

export default InputSelect
