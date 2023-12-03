// eslint-disable-next-line react/prop-types
const Button = ({ variant, children, className, ...props }) => {
  const variants = {
    primary:
      'bg-primary-500 text-white border border-primary-500 shadow-btn hover:bg-primary-600 duration-300 ease-in-out',
    secondary:
      'bg-white text-primary-500 border border-primary-500 shadow-btn hover:bg-primary-100 duration-300 ease-in-out',
    text: 'text-primary-700 text-left',
  }

  const defaultClassName = `py-3 px-6 rounded-full ${variants[variant]} ${className}`

  return (
    <button className={defaultClassName} {...props}>
      {children}
    </button>
  )
}

export default Button
