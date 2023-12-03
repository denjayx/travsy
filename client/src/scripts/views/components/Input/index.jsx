import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage } from '../../components/ErrorMessage'

const variants = { fill: { white_A700: 'bg-white-A700 text-gray-500' } }
const shapes = { round: 'rounded-[12px]' }
const sizes = { xs: 'pb-4 pt-[19px] px-4', am: 'p-6 am:px-5' }

const Input = React.forwardRef(
  (
    {
      wrapClassName = '',
      className = '',
      name = '',
      placeholder = '',
      type = 'text',
      children,
      errors = [],
      label = '',
      prefix,
      suffix,
      onChange,
      shape = '',
      size = '',
      variant = '',
      color = '',
      ...restProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value)
    }

    return (
      <>
        <div
          className={`${wrapClassName} 
              ${shapes[shape] || ''} 
              ${variants[variant]?.[color] || ''} 
              ${sizes[size] || ''}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${className} bg-transparent border-0`}
            type={type}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </div>
        {!!errors && <ErrorMessage errors={errors} />}
      </>
    )
  },
)

Input.propTypes = {
  wrapClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  shape: PropTypes.oneOf(['round']),
  size: PropTypes.oneOf(['xs', 'am']),
  variant: PropTypes.oneOf(['fill']),
  color: PropTypes.oneOf(['white_A700']),
}

export { Input }
