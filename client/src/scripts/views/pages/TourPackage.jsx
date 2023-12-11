import PopularPackage from '../components/Popular/PopularPackage'
import CitySelect from '../components/Filter/CitySelect'
import BookingFields from '../components/BookingFields/BookingFields'

export default function TourPackage() {
  return (
    <section className="mt-32">
      <BookingFields />
      <div className="flex">
        <CitySelect />
        <PopularPackage className="mt-16" />
      </div>
    </section>
  )
}
