/* eslint-disable react/prop-types */
import { useState } from 'react'
import Button from '../Buttons/Button'

const Search = ({ onSearch }) => {
  const [searchData, setSearchData] = useState('')

  const handleSearchChange = (event) => {
    setSearchData(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    onSearch(searchData)
  }

  return (
    <section className="container flex items-center gap-2">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="simple-search"
          className="block w-full rounded-xl border border-primary-300 bg-white px-6 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-300"
          placeholder="Lagi pingin liburan kemana nih?"
          onChange={handleSearchChange}
          required
        />
      </div>
      <Button
        onSubmit={handleSearchSubmit}
        variant="primary"
        className="rounded-xl"
      >
        Cari
      </Button>
    </section>
  )
}

export default Search
