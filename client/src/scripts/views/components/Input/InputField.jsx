/* eslint-disable react/prop-types */
import { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { HiOutlineEyeOff } from 'react-icons/hi'
import { HiOutlineEye } from 'react-icons/hi'

const InputField = ({
  label,
  className,
  placeholder,
  type,
  name,
  value,
  onChange,
  showCounter = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [count, setCount] = useState(null)

  const inputNumberValue = type === 'number' ? count : value

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const increment = () => {
    setCount((prev) => prev + 1)
  }

  const decrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1)
    }
  }

  const defaultClassName =
    'border py-3 rounded-lg appearance-none px-4 w-full border-gray-200 outline-none focus:outline-none focus:ring-1 focus:ring-primary-300 '
  const isPassword = type === 'password'
  return (
    <div className="w-full">
      <label>{label}</label>
      <div className="relative">
        <input
          className={`${defaultClassName} ${className}`}
          type={!isPassword ? type : showPassword ? 'text' : 'password'}
          name={name}
          value={type === 'number' ? inputNumberValue : value}
          placeholder={placeholder}
          onChange={(e) => {
            if (type === 'number') {
              setCount(parseInt(e.target.value, 10))
            } else {
              onChange(e)
            }
          }}
          {...props}
        />
        {type === 'number' && showCounter && (
          <section className="flex">
            <button
              className="absolute right-11 top-2.5 h-6 rounded-md bg-red/5 px-2 py-1"
              onClick={decrement}
            >
              <FaMinus className="items-center text-red" size={15} />
            </button>
            <button
              className="absolute right-2 top-2.5 h-6 rounded-md bg-primary-50 px-2 py-1"
              onClick={increment}
            >
              <FaPlus className="text-primary-800" size={15} />
            </button>
          </section>
        )}
        {isPassword && (
          <button
            className="absolute inset-y-0 right-4 text-gray-600"
            type="button"
            onClick={handleShowPassword}
          >
            {showPassword ? (
              <HiOutlineEye size={22} className="text-gray-400" />
            ) : (
              <HiOutlineEyeOff size={22} className="text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default InputField
