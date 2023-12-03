import React from 'react'

const sizeClasses = {
  txtInterRegular20: 'font-inter font-normal',
  txtInterRegular16WhiteA700: 'font-inter font-normal',
  txtInterSemiBold20: 'font-inter font-semibold',
  txtInterBold48: 'font-bold font-inter',
  txtInterRegular12: 'font-inter font-normal',
  txtInterBold32: 'font-bold font-inter',
  txtInterRegular16: 'font-inter font-normal',
  txtInterSemiBold16: 'font-inter font-semibold',
}

const Text = ({ children, className = '', size, as, ...restProps }) => {
  const Component = as || 'p'

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  )
}

export { Text }
