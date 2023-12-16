import BookingFields from '../components/BookingFields/BookingFields';
import CitySelect from '../components/Filter/CitySelect';
import PopularPackage from '../components/Popular/PopularPackage';

export default function TourPackage() {
  return (
    <section className="mt-32">
      <BookingFields />

      <div className="flex justify-between mt-16">
        <div className="flex flex-col">
          <PopularPackage />
        </div>

        <div className="flex flex-col">
          <CitySelect />
        </div>
      </div>

      {/* Add more cards below if needed */}
    </section>
  );
}
