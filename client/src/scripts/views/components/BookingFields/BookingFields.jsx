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
      <form action="" className="flex flex-col gap-3">
        <div className="container flex w-full gap-3">
          <InputDate
            limitMinDate={new Date()}
            placeholder="Mulai Kapan Kamu Pergi?"
          />
          <InputDate
            limitMinDate={new Date()}
            placeholder="Sampai Kapan Kamu Pergi?"
          />
        </div>
        <Search />
      </form>
    </section>
  )
}

export default BookingFields
