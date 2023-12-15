/* eslint-disable react/prop-types */
const Paragraph = ({ children, color, ...props }) => {
  let textColor = 'text-gray-400'

  if (color === 'white') {
    textColor = 'text-white'
  }

  const className = `text-base ${textColor}`
  return (
    <p className={className} {...props}>
      {children}
    </p>
  )
}

export default Paragraph
