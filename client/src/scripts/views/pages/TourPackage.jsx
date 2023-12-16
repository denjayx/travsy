import BookingFields from '../components/BookingFields/BookingFields'
import SideBarFilter from '../components/BookingFields/SideBarFilter'
import PopularPackage from '../components/Popular/PopularPackage'

export default function TourPackage() {
  return (
    <section className="mt-32">
      <BookingFields />
      <div className="container mt-16 flex gap-4 max-xl:flex-col-reverse max-xl:gap-14">
        <PopularPackage />
        <SideBarFilter />
      </div>
    </section>
  )
}
