/* eslint-disable react/prop-types */
const Labels = ({ className, city }) => {
  const defaultClassName = `bg-primary-50 py-2 px-4 rounded-full text-xs text-primary-700`
  return (
    <>
      <span className={`${defaultClassName} ${className}`}>{city}</span>
    </>
  )
}

export default Labels
