
import Search from '../components/Search/Search'
import Labelpaket from '../components/Hero/labelpaket'
import Daterangepicker from '../components/Datepicker/Daterangepicker'
import CitySelect from '../components/Filter/CitySelect'
import Labelteks from '../components/Paragraph/Labelteks'
import PopularPackage from '../components/Popular/PopularPackage'

export default function TourPackage() {
  return (
    <section className="mt-32">
      <Labelpaket />
      <Daterangepicker />
      <Search />
      <div className='flex items-center justify-between gap-6'>
  <div>
    <PopularPackage />
  </div>
  <div className="flex flex-col items-start gap-2">
    <Labelteks />
    <CitySelect />
  </div>
</div>



    </section>
  )
}
