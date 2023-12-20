import { useOutletContext, useParams } from 'react-router-dom'
import DestinationDetails from '../components/Details/DestinationDetails'
import PackageDetails from '../components/Details/PackageDetails'
import { useEffect, useState } from 'react'
import { getPackageDetail } from '../../data/api'

export default function Details() {
  const { id } = useParams('')
  const [packageDetail, setPackageDetail] = useState({
    tourGuide: {
      avatarUrl: '',
      firstName: '',
      lastName: '',
    },
    package: {
      id: '',
      packageName: '',
      thumbnailUrl: '',
      price: 0,
      description: '',
      serviceDuration: 0,
      destinations: [],
    },
  })

  const { user } = useOutletContext()

  useEffect(() => {
    const fetchPackageDetail = async () => {
      const packageDetail = await getPackageDetail(id)
      setPackageDetail(packageDetail)
      console.log(packageDetail)
    }
    fetchPackageDetail()
  }, [id])

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [])

  return (
    <section className="container mt-32">
      <PackageDetails token={user?.token} packageData={packageDetail} />
      {packageDetail.package.destinations.length !== 0 &&
        packageDetail.package.destinations.map((destination, index) => (
          <DestinationDetails key={index} destinationData={destination} />
        ))}
    </section>
  )
}
