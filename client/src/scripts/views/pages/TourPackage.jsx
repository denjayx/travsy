import PopularPackage from '../components/Popular/PopularPackage'
import BookingFields from '../components/BookingFields/BookingFields'

export default function TourPackage() {
  return (
    <section className="mt-32">
      <BookingFields />
      <div className="flex">
        <PopularPackage className="mt-16" />
      </div>
    </section>
  )
}
