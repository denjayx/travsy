import React from 'react'

export const ErrorMessage = ({ errors = [], className = '' }) => {
  return (
    errors?.length > 0 && (
      <div
        className={`text-red-500 mt-1 w-full text-left text-xs ${className}`}
      >
        {errors.join(', ')}
      </div>
    )
  )
}
