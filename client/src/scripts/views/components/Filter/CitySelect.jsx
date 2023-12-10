import React, { useState } from 'react'
import Select from 'react-select'

const CitySelect = () => {
  const baliCities = [
    { value: 'denpasar', label: 'Denpasar' },
    { value: 'ubud', label: 'Ubud' },
    { value: 'kuta', label: 'Kuta' },
    { value: 'denpasar', label: 'Denpasar' },
    // Add more cities as needed
  ]

  const [selectedCity, setSelectedCity] = useState(null)
  const [numDestinations, setNumDestinations] = useState(0)
  const [minPrice, setMinPrice] = useState('Rp.')
  const [maxPrice, setMaxPrice] = useState('Rp.')

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption)
  }

  const handleNumDestinationsChange = (e) => {
    setNumDestinations(e.target.value)
  }

  const handleMinPriceChange = (e) => {
    let value = e.target.value.trim()

    // Check if the value is empty, if so, set it to 'Rp.'
    value = value || 'Rp.'

    // Check if the value starts with "Rp.", if not, add it
    if (!value.startsWith('Rp.')) {
      value = 'Rp.' + value
    }

    setMinPrice(value)
  }

  const handleMaxPriceChange = (e) => {
    let value = e.target.value.trim()

    // Check if the value starts with "Rp.", if not, add it
    if (!value.startsWith('Rp.')) {
      value = 'Rp.' + value
    }

    // Check if maxPrice is less than minPrice, if so, set it to minPrice
    if (
      parseInt(value.replace('Rp.', '')) < parseInt(minPrice.replace('Rp.', ''))
    ) {
      value = minPrice
    }

    setMaxPrice(value)
  }

  return (
    <div
      className="card"
      style={{
        width: '292px',
        height: '400px',
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        margin: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginLeft: 'auto',
      }}
    >
      <div className="relative">
        <label className="block text-sm font-bold font-medium">Kota</label>
        <Select
          className={`rounded-md border ${
            selectedCity ? 'border-b border-gray-300' : ''
          } p-2 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50`}
          value={selectedCity}
          onChange={handleCityChange}
          options={baliCities}
          placeholder="Select a city"
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-bold font-medium">
          Jumlah Destinasi
        </label>
        <input
          type="number"
          value={numDestinations}
          onChange={handleNumDestinationsChange}
          placeholder="Enter the number of destinations"
          className="rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50"
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-bold font-medium">
          Harga Minimal
        </label>
        <input
          type="text"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="Rp."
          className="rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50"
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-bold font-medium">
          Harga Maksimal
        </label>
        <input
          type="text"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="Rp."
          className="rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  )
}

export default CitySelect
