import React from 'react';
import Paragraph from '../Paragraph/Paragraph'; // Assuming this is the correct import for the Paragraph component

const Labelwisata = () => {
  return (
    <section className="container mt-14 flex flex-col items-center lg:flex-row justify-between">
      <div className="flex h-full flex-col items-center gap-12">
        <h1
          className=" flex items-center text-xl font-bold text-primary-700"
        >
          Paket Terpopuler{' '}
        </h1>
        <Paragraph>
          Kami menyajikan beberapa paket wisata menarik yang sering dikunjungi oleh wisatawan lokal maupun mancanegara
        </Paragraph>
      </div>
    </section>
  );
};

export default Labelwisata;
