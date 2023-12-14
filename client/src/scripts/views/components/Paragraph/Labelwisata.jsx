import React from 'react';
import Paragraph from '../Paragraph/Paragraph';

const Labelwisata = () => {
  return (
    <section className="container mt-14">
      <div className="flex flex-col items-start gap-12">
        <h1 className="text-xl font-bold text-primary-700">Paket Terpopuler</h1>
        <Paragraph>
          Kami menyajikan beberapa paket wisata menarik yang sering dikunjungi oleh wisatawan lokal maupun mancanegara
        </Paragraph>
      </div>
    </section>
  );
};

export default Labelwisata;
