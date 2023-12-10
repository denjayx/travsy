import PopularPackage from '../components/Popular/PopularPackage'
import Search from '../components/Search/Search'
import Labelpaket from '../components/Hero/labelpaket'
import Daterangepicker from '../components/Datepicker/Daterangepicker'
import CitySelect from '../components/Filter/CitySelect'

export default function TourPackage() {
  return (
    <section className="mt-32">
      <Labelpaket />
      <Daterangepicker />
      <Search />
      <div className='flex'>
        <CitySelect />
        <PopularPackage className="mt-16" />
      </div>
    </section>
  )
}
