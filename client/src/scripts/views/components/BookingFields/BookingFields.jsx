import React, { useState } from 'react';
import InputDate from '../Input/InputDate';
import InputNumber from '../Input/InputNumber';
import Search from '../Search/Search';

const BookingFields = () => {
  const [numPeople, setNumPeople] = useState(1); // Initial value for the number of people

  return (
    <section className="space-y-4">
      <div className="container">
        <h1 className="mb-4 flex items-center text-2xl font-bold text-primary-950">
          Liburan Tanpa Khawatir
          <span className="ml-2 text-primary-700">Bersama Travsy</span>
        </h1>
      </div>
      <form action="" className="flex flex-col gap-3">
        <div className="container flex flex-col lg:flex-row gap-3">
          <div className="flex-grow">
            <InputDate
              limitMinDate={new Date()}
              placeholder="Mulai Kapan Kamu Pergi?"
            />
          </div>
          <div className="flex-grow">
            <InputDate
              limitMinDate={new Date()}
              placeholder="Sampai Kapan Kamu Pergi?"
            />
          </div>
          <div className="flex-grow">
            <InputNumber
              id="number-input"
              value={numPeople}
              onValueChange={(value) => setNumPeople(value)}
              placeholder="Jumlah Orang"
            />
          </div>
        </div>
        <Search />
      </form>
    </section>
  );
};

export default BookingFields;
