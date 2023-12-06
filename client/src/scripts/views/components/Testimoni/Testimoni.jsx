import AvatarImage from '../../../../assets/images/avatar-testi.png'
import Paragraph from '../Paragraph/Paragraph'
import TestimoniCard from './TestimoniCard'

const Testimoni = () => {
  const testimoniData = [
    {
      avatar: AvatarImage,
      name: 'Marvin McKinney',
      text: 'Manish was awesome and exactly the sort of experienced entrepreneur I needed to hear from.',
    },
    {
      avatar: AvatarImage,
      name: 'Arlene McCoy',
      text: 'Daniel was fantastic. Joining my first call with a mentor, I was flustered and did not know what to ',
    },
    {
      avatar: AvatarImage,
      name: 'Darrell Steward',
      text: 'I had an instant connection with Dani, and loved talking to her! We talked about Worklife balance, a',
    },
  ]
  return (
    <section className="container mt-24 space-y-6">
      <div className="space-y-4 lg:w-10/12 xl:w-6/12">
        <h3 className="text-xl font-bold text-primary-950">Testimoni</h3>
        <Paragraph>
          Ulasan dari mereka yang telah merasakan kemudahan liburan..
        </Paragraph>
      </div>
      <div className="flex gap-12 overflow-x-scroll ps-8">
        {testimoniData.map((data, index) => (
          <TestimoniCard
            key={index}
            avatar={data.avatar}
            name={data.name}
            text={data.text}
          />
        ))}
      </div>
    </section>
  )
}

export default Testimoni
