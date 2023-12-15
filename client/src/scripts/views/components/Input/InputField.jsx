/* eslint-disable react/prop-types */
import { useState } from 'react'
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
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const defaultClassName =
    'border py-3 rounded-lg px-4 w-full border-gray-200 outline-none focus:outline-none focus:ring focus:ring-primary-300 '
  const isPassword = type === 'password'
  return (
    <div className="space-y-2">
      <label>{label}</label>
      <div className="relative">
        <input
          className={`${defaultClassName} ${className}`}
          type={!isPassword ? type : showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          {...props}
        />
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
