/* eslint-disable react/prop-types */
const WhyUsItem = ({ imageUrl, title }) => {
  return (
    <div className="relative flex h-20 items-center justify-center overflow-hidden rounded-lg">
      <img
        className="w-full object-cover brightness-75"
        src={imageUrl}
        alt={`${title} image`}
      />
      <span className="absolute inset-x-0 mx-auto block w-fit text-md text-white ">
        {title}
      </span>
    </div>
  )
}

export default WhyUsItem
