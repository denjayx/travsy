import PopularPackage from '../components/Popular/PopularPackage'
import Footer from '../components/Footer/Footer'
import Search from '../components/Search/Search'

export default function TourPackage() {
  return (
    <section className="mt-32">
      <Search />
      <PopularPackage className="mt-16" />
      <Footer />
    </section>
  )
}
