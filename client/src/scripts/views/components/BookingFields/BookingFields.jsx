import InputDate from '../Input/InputDate'
import Search from '../Search/Search'

const BookingFields = () => {
  return (
    <section className="space-y-4">
      <div className="container">
        <h1 className="mb-4 flex items-center text-2xl font-bold text-primary-950">
          Liburan Tanpa Khawatir
          <span className="ml-2 text-primary-700">Bersama Travsy</span>
        </h1>
      </div>
      <div>
        <InputDate />
      </div>
      <Search />
    </section>
  )
}

export default BookingFields
