import ScaleItem from './ScaleItem'
import ActiveUserIcon from '../../../../assets/images/users.png'
import DestinationIcon from '../../../../assets/images/maps.png'
import TourGuideIcon from '../../../../assets/images/tourguide.png'

const Scale = () => {
  const scaleItems = [
    {
      userImage: ActiveUserIcon,
      count: 130,
      title: 'Pengguna Aktif',
    },
    {
      userImage: DestinationIcon,
      count: 24,
      title: 'Tempat Wisata',
    },
    {
      userImage: TourGuideIcon,
      count: 48,
      title: 'Pemandu Wisata',
    },
  ]

  return (
    <section className="container mt-24 flex w-full flex-col items-center justify-center">
      <h3 className="text-xl font-bold text-primary-950">Skala Travsy</h3>
      <div className="mt-6 flex w-full gap-4 overflow-x-scroll md:justify-center md:gap-12">
        {scaleItems.map((item, index) => (
          <ScaleItem
            key={index}
            userImage={item.userImage}
            count={item.count}
            title={item.title}
          />
        ))}
      </div>
    </section>
  )
}

export default Scale
