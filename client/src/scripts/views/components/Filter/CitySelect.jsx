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

  const [selectedCity, setSelectedCity] = useState(null);
  const [numberDestinations, setNumberDestinations] = useState(0);
  const [minPrice, setMinPrice] = useState('Rp.');
  const [maxPrice, setMaxPrice] = useState('Rp.');

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleNumberDestinationsChange = (e) => {
    setNumberDestinations(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    let value = e.target.value.trim();
    value = value || 'Rp.';

    if (!value.startsWith('Rp.')) {
      value = 'Rp.' + value;
    }

    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    let value = e.target.value.trim();

    if (!value.startsWith('Rp.')) {
      value = 'Rp.' + value;
    }

    if (parseInt(value.replace('Rp.', '')) < parseInt(minPrice.replace('Rp.', ''))) {
      value = minPrice;
    }

    setMaxPrice(value);
  };

  const cardStyle = {
    width: '100%', // Adjusted width for responsiveness
    maxWidth: '400px', // Added max-width for larger screens
    padding: '24px',
    borderRadius: '16px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    margin: '8px auto', // Centered the card horizontally
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const labelStyle = {
    width: '9rem', // Set the width as per your requirement
    height: '1.5rem', // Set the height as per your requirement
  };

  return (
    <section id="filterSection" className="container flex flex-col gap-8">
      <h3 className="text-xl font-bold text-primary-700">Filter</h3>
      <Paragraph>Sesuaikan liburanmu dengan kebutuhan kamu</Paragraph>

      <div className="card" style={cardStyle}>
        <div className="relative">
          <label style={labelStyle} className="block text-sm font-bold font-bold">
            Kota
          </label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 w-full h-10"
          >
            <option value="" disabled>
              Select a city
            </option>
            {baliCities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label style={labelStyle} className="block text-sm font-bold font-bold">
            Jumlah Destinasi
          </label>
          <input
            type="number"
            value={numberDestinations}
            onChange={handleNumberDestinationsChange}
            placeholder="Enter the number of destinations"
            className="rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 w-full h-10"
          />
        </div>

        <div className="relative">
          <label style={labelStyle} className="block text-sm font-bold font-bold">
            Harga Minimal
          </label>
          <input
            type="text"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Rp."
            className="rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring focus:ring-primary-200 focus:ring-opacity-50 w-full h-10"
          />
        </div>

        <div className="relative">
          <label style={labelStyle} className="block text-sm font-bold font-bold">
            Harga Maksimal
          </label>
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
