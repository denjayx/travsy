import React from 'react';
import Card from '../components/Cards/Card';
import CitySelect from '../components/Filter/CitySelect';
import Daterangepicker from '../components/Datepicker/Daterangepicker';
import Labelpaket from '../components/Hero/labelpaket';
import Labelteks from '../components/Paragraph/Labelteks';
import Labelwisata from '../components/Paragraph/Labelwisata';
import Search from '../components/Search/Search';

export default function TourPackage() {
  return (
    <section className="mt-32">
      <Labelpaket />
      <Daterangepicker />
      <Search />
      <div className="flex flex-col md:flex-row items-start gap-8">
        <section className="container mt-14">
          <div className="flex flex-wrap gap-8">
            <Labelwisata />
            <div className="flex gap-8">
              <Card />
              <Card />
              <Card />
            </div>
            <Card />
          </div>
        </section>
        <div className="flex flex-col items-start gap-1">
          <Labelteks />
          <CitySelect />
        </div>
      </div>
    </section>
  );
}
