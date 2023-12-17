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
  isDisabled = false,
  showCounter = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [count, setCount] = useState(0)

  const inputNumberValue = type === 'number' ? count : value

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const increment = () => {
    setCount((prev) => prev + 1)
  }

  const decrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1)
    }
  }

  const defaultClassName =
    'border py-3 rounded-lg appearance-none px-4 w-full border-gray-200 outline-none focus:outline-none focus:ring-1 focus:ring-primary-300 '
  const isPassword = type === 'password'

  const generateInputField = (type) => {
    if (type === 'textArea') {
      return (
        <textarea
          className={`${defaultClassName} ${className} mt-2`}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...props}
          disabled={isDisabled}
        >
          {value}
        </textarea>
      )
    } else {
      return (
        <>
          <input
            className={`${defaultClassName} ${className}`}
            type={!isPassword ? type : showPassword ? 'text' : 'password'}
            name={name}
            value={
              type === 'number'
                ? inputNumberValue === 0
                  ? placeholder
                  : count
                : value
            }
            placeholder={placeholder}
            onChange={(e) => {
              if (type === 'number') {
                setCount(parseInt(e.target.value, 10))
                let newValue = parseInt(e.target.value, 10)
                if (!showCounter && newValue < 0) {
                  newValue = 0
                }
                setCount(newValue)
                onChange(e)
              } else {
                onChange(e)
              }
            }}
            disabled={isDisabled}
            {...props}
          />
          {type === 'number' && showCounter && (
            <section className="flex">
              <button
                className="bg-red/5 absolute right-11 top-2.5 h-6 rounded-md px-2 py-1"
                type="button"
                onClick={decrement}
              >
                <FaMinus className="text-red items-center" size={15} />
              </button>
              <button
                className="absolute right-2 top-2.5 h-6 rounded-md bg-primary-50 px-2 py-1"
                type="button"
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
        </>
      )
    }
  }

  return (
    <div className="w-full">
      <label className="text-primary-950">{label}</label>
      <div className="relative w-full">{generateInputField(type)}</div>
    </div>
  )
}

export default InputField
