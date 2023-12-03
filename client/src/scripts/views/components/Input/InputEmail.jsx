/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const InputEmail = ({
  condition,
  className,
  label,
  id,
  children,
  ...props
}) => {
  const conditions = {
    default: 'border-gray-500',
    error: 'border-red',
  }

  const defaultClassName = `border py-3 rounded-lg px-4 w-full outline-none focus:outline-none focus:ring focus:ring-violet-300  ${conditions[condition]} ${className}`

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label}>{children}</label>
      <input
        type="email"
        id={id}
        className={defaultClassName}
        {...props}
        required
      />
    </div>
  )
}

export default InputEmail
