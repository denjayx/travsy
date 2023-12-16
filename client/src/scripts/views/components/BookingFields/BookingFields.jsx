/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import Search from '../Search/Search'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { useEffect } from 'react'

const BookingFields = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [searchData, setSearchData] = useState('')

  const formatDate = (date) => {
    return date ? moment(date).format('YYYY-MM-DD') : null
  }

  useEffect(() => {
    onDateChange(formatDate(startDate), formatDate(endDate), searchData)
  }, [startDate, endDate, searchData])
  console.log(searchData)
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
              minDate={new Date()}
              onChange={(date) => setStartDate(date)}
              placeholderText="Mulai kapan kamu pergi?"
              className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 outline-none focus:outline-none focus:ring-1 focus:ring-primary-300"
              wrapperClassName="w-full"
              dateFormat="d MMMM yyyy"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate || new Date()}
              placeholderText="Sampai kapan kamu pergi?"
              className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 outline-none focus:outline-none focus:ring-1 focus:ring-primary-300"
              wrapperClassName="w-full"
              dateFormat="d MMMM yyyy"
            />
          </div>
        </div>
        <Search onSearchChange={setSearchData} />
      </div>
    </section>
  )
}

export default BookingFields
