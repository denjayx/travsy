import BookingFields from '../components/BookingFields/BookingFields'
import PopularPackage from '../components/Popular/PopularPackage'

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
