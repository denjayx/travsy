import React from 'react';
import Paragraph from '../Paragraph/Paragraph'; // Assuming this is the correct import for the Paragraph component

const MyLabelteks = () => {
  return (
    <section className="container mt-14 flex flex-col items-center lg:flex-row justify-between">
      <div className="flex h-full flex-col items-center gap-12">
        <h1
          className="flex items-center  text-xl font-bold text-primary-700"
        >
          Filter{' '}
        </h1>
        <Paragraph>
          Sesuaikan liburanmu dengan kebutuhan kamu
        </Paragraph>
      </div>
    </section>
  );
};

export default MyLabelteks;
