/* eslint-disable react/prop-types */
const ScaleItem = ({ userImage, count, title }) => {
  return (
    <div className="flex flex-shrink-0 items-center gap-4 rounded-full border border-primary-500 bg-white pb-4 pe-12 ps-4 pt-4 ">
      <div className="rounded-full bg-primary-100 p-2">
        <img className="h-16 w-16" src={userImage} alt={`${title} icon`} />
      </div>
      <div>
        <h5 className="text-2xl font-bold leading-8 text-primary-700 ">
          {count}
        </h5>
        <span className="text-sm text-primary-700">{title}</span>
      </div>
    </div>
  )
}

export default ScaleItem
