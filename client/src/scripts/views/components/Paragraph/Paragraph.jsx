/* eslint-disable react/prop-types */
const Paragraph = ({ children, ...props }) => {
  const className = `text-base text-gray-700`
  return (
    <p className={className} {...props}>
      {children}
    </p>
  )
}

export default Paragraph
