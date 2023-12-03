import Image1 from '../../../../assets/images/whyus-1.png'
import Image2 from '../../../../assets/images/whyus-2.png'
import Image3 from '../../../../assets/images/whyus-3.png'
import Image4 from '../../../../assets/images/whyus-4.png'
import Image5 from '../../../../assets/images/whyus-5.png'
import Paragraph from '../Paragraph/Paragraph'
import WhyUsItem from './WhyUsItem'

const WhyUs = () => {
  const whyusItem = [
    {
      imageUrl: Image1,
      title: 'Perjalanan Nyaman',
    },
    {
      imageUrl: Image2,
      title: 'Hotel Terpilih',
    },
    {
      imageUrl: Image3,
      title: 'Akomodasi Bintang 5',
    },
    {
      imageUrl: Image4,
      title: 'Tour Kota Premium',
    },
    {
      imageUrl: Image5,
      title: 'Layanan 24 Jam',
    },
  ]
  return (
    <section className="container mt-24 space-y-6">
      <div className="space-y-4 lg:w-10/12 xl:w-6/12">
        <h3 className="text-xl font-bold text-primary-950">
          Kenapa Harus Travsy?
        </h3>
        <Paragraph>
          Kami berkomitmen untuk memberikan layanan yang berkualitas dan membuat
          setiap momen liburan Anda menjadi berkesan.
        </Paragraph>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {whyusItem.map((item, index) => (
          <WhyUsItem key={index} imageUrl={item.imageUrl} title={item.title} />
        ))}
      </div>
    </section>
  )
}

export default WhyUs
