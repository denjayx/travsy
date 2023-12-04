/* eslint-disable react/prop-types */
import Paragraph from '../Paragraph/Paragraph'

const TestimoniCard = ({ avatar, name, text }) => {
  return (
    <div className="relative w-full flex-shrink-0 rounded-xl bg-white p-8 ps-16 md:w-8/12 lg:w-6/12 xl:w-4/12">
      <img
        src={avatar}
        alt={`${name} avatar`}
        className="absolute inset-x-0 -left-8"
      />
      <h6>{name}</h6>
      <Paragraph>{text}</Paragraph>
    </div>
  )
}

export default TestimoniCard
