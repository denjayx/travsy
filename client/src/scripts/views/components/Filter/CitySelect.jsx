/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Paragraph from '../Paragraph/Paragraph'; // Adjust the path accordingly

const CitySelect = () => {
  const baliCities = [
    { value: 'denpasar', label: 'Denpasar' },
    { value: 'ubud', label: 'Ubud' },
    { value: 'kuta', label: 'Kuta' },
    // Add more cities as needed
  ];

  const [selectedCity, setSelectedCity] = useState('');
  const [numDestinations, setNumDestinations] = useState(0);
  const [minPrice, setMinPrice] = useState('Rp.');
  const [maxPrice, setMaxPrice] = useState('Rp.');

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleNumDestinationsChange = (e) => {
    setNumDestinations(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    let value = e.target.value.trim();

    // Check if the value is empty, if so, set it to 'Rp.'
    value = value || 'Rp.';

    // Check if the value starts with "Rp.", if not, add it
    if (!value.startsWith('Rp.')) {
      value = 'Rp.' + value;
    }

    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    let value = e.target.value.trim();

    // Check if the value starts with "Rp.", if not, add it
    if (!value.startsWith('Rp.')) {
      value = 'Rp.' + value;
    }

    // Check if maxPrice is less than minPrice, if so, set it to minPrice
    if (parseInt(value.replace('Rp.', '')) < parseInt(minPrice.replace('Rp.', ''))) {
      value = minPrice;
    }

    setMaxPrice(value);
  };

  return (
    <section
      id="filterSection"
      className="container flex flex-col gap-8"
    >
      <h3 className="text-xl font-bold text-primary-950">Filter</h3>
      <Paragraph>Sesuaikan liburanmu dengan kebutuhan kamu</Paragraph>

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
          <label className="block text-sm font-bold font-bold">Kota</label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 w-full h-10"
          >
            <option value="" disabled>Select a city</option>
            {baliCities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block text-sm font-bold font-bold">Jumlah Destinasi</label>
          <input
            type="number"
            value={numDestinations}
            onChange={handleNumDestinationsChange}
            placeholder="Enter the number of destinations"
            className="rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 w-full h-10"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-bold font-bold">Harga Minimal</label>
          <input
            type="text"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Rp."
            className="rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 w-full h-10"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-bold font-bold">Harga Maksimal</label>
          <input
            type="text"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Rp."
            className="rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 w-full h-10"
          />
        </div>
      </div>
    </section>
  );
};

export default CitySelect;
