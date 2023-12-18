/* eslint-disable react/prop-types */
import Paragraph from '../Paragraph/Paragraph'

const StepsCard = ({ image, title, description }) => {
  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-xl border border-primary-300 bg-white p-8 ">
      <img src={image} alt={`${title} image`} width="80px" />
      <h5 className="text-lg font-bold text-primary-700">{title}</h5>
      <Paragraph>{description}</Paragraph>
    </div>
  )
}

export default StepsCard
