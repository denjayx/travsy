import BookingFields from '../components/BookingFields/BookingFields';
import CitySelect from '../components/Filter/CitySelect';
import PopularPackage from '../components/Popular/PopularPackage';

export default function TourPackage() {
  return (
    <section className="mt-32">
      <BookingFields />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <PopularPackage className="mt-16" />
        </div>
        <div className="flex flex-col">
          {/* Adjust the margin to separate CitySelect from PopularPackage */}
          <CitySelect className="mt-16 ml-4" />
        </div>
      </div>
      {/* Add more cards below if needed */}
    </section>
  );
}
