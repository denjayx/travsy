import DestinationDetails from '../components/Details/DestinationDetails'
import PackageDetails from '../components/Details/PackageDetails'

export default function Details() {
  return (
    <section className="container mt-32">
      <PackageDetails />
      <DestinationDetails />
    </section>
  )
}
