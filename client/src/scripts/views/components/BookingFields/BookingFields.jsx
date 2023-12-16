import { useState } from 'react'
import Search from '../Search/Search'
import DatePicker from 'react-datepicker'
import moment from 'moment'

const BookingFields = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const formatDate = (date) => {
    return date ? moment(date).format('YYYY-MM-DD') : null
  }

  console.log('Formatted Start Date:', formatDate(startDate))
  console.log('Formatted End Date:', formatDate(endDate))

  return (
    <section className="space-y-4">
      <div className="container">
        <h1 className="mb-4 items-center text-2xl font-bold text-primary-950">
          Liburan Tanpa Khawatir
          <span className="ml-2 text-primary-700">Bersama Travsy</span>
        </h1>
      </div>
      <div className="flex flex-col gap-3">
        <div className="container flex w-full items-center justify-center gap-2">
          <div className="flex w-full items-center gap-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Mulai kapan kamu pergi?"
              className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 outline-none focus:outline-none focus:ring-1 focus:ring-primary-300"
              wrapperClassName="w-full"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="Sampai kapan kamu pergi?"
              className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 outline-none focus:outline-none focus:ring-1 focus:ring-primary-300"
              wrapperClassName="w-full"
            />
          </div>
        </div>
        <Search />
      </div>
    </section>
  )
}

export default BookingFields
