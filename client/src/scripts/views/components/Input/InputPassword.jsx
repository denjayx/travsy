/* eslint-disable react/prop-types */
import { useState } from 'react'

const InputPassword = ({
  condition,
  className,
  label,
  id,
  children,
  setPassword,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const conditions = {
    default: 'border-gray-500',
    error: 'border-red',
  }

  const defaultClassName = `border py-3 rounded-lg px-4 w-full outline-none focus:outline-none focus:ring focus:ring-violet-300  ${conditions[condition]}`

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label}>{children}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          className={`${defaultClassName} ${className}`}
          {...props}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
          required
        />
        <button type="button" className="absolute right-4 top-3.5">
          {showPassword ? (
            <svg
              onClick={handleShowPassword}
              className="h-5 w-5 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          ) : (
            <svg
              onClick={handleShowPassword}
              className="h-5 w-5 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 14"
            >
              <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
              </g>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default InputPassword
