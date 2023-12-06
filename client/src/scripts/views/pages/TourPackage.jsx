import PopularPackage from '../components/Popular/PopularPackage'
import Search from '../components/Search/Search'
import Labelpaket from '../components/Hero/labelpaket'

export default function TourPackage() {
  return (
    <section className="mt-32">
      <Labelpaket />
      <Search />
      <PopularPackage className="mt-16" />
    </section>
  )
}
