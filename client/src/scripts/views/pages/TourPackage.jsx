import Cards  from '../components/Cards/Card'
import Search from '../components/Search/Search'
import Labelpaket from '../components/Hero/labelpaket'
import Daterangepicker from '../components/Datepicker/Daterangepicker'
import CitySelect from '../components/Filter/CitySelect'
import Labelteks from '../components/Paragraph/Labelteks'
import Labelwisata from '../components/Paragraph/Labelwisata'

export default function TourPackage() {
  return (
    <section className="mt-32">
      <Labelpaket />
      <Daterangepicker />
      <Search />
     <div className='flex justify-between'>
     <Labelwisata/>
      <Labelteks/> 
     </div>   <div className='flex justify-between'>
        <Cards className="mt-16" />
        <Cards className="mt-16" />
        <Cards className="mt-16" />
        <CitySelect />
      </div>

    </section>
  )
}
