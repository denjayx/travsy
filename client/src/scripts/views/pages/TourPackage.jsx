import SearchWisata from '../components/Search/SearchWisata'
import Footer from '../components/Footer/footer'
import PopularPackage from '../components/Popular/PopularPackage'

export default function TourPackage() {
  return (
    <section className=" mt-32 ">
      <SearchWisata />
      <PopularPackage />
      <Footer />
    </section>
  )
}
