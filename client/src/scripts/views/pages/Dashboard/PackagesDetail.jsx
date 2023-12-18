import { useEffect, useState } from 'react'
import { NavLink, useOutletContext, useParams } from 'react-router-dom'
import { BASE_IMAGEURL, getProfilePackageDetail } from '../../../data/api'
import DestinationDetails from '../../components/Details/DestinationDetails'
import Button from '../../components/Buttons/Button'

const PackagesDetail = () => {
  const { id } = useParams()
  const { user } = useOutletContext()
  const [packageDetail, setPackageDetail] = useState({
    id: '',
    packageName: '',
    thumbnailUrl: '',
    price: 0,
    description: '',
    serviceDuration: 0,
    destinations: [],
  })

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  useEffect(() => {
    const fetchPackageDetail = async () => {
      const packageDetail = await getProfilePackageDetail(user.token, id)
      setPackageDetail(packageDetail)
    }

    fetchPackageDetail()
  }, [id, user])

  return (
    <div className="flex flex-col p-10">
      <section
        id="packagedetails"
        className=" flex w-full flex-col items-center gap-6 rounded-xl lg:flex-row "
      >
        <div className="h-full w-full overflow-hidden rounded-lg md:rounded-l-lg lg:w-5/12">
          <img
            src={BASE_IMAGEURL + packageDetail.thumbnailUrl}
            alt="Thumbnail Card"
            className=" h-full w-full object-cover "
          />
        </div>
        <section className="flex h-full w-full flex-col justify-between gap-1 rounded-lg border-gray-200 bg-white p-5 md:rounded-l-lg">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-primary-950">
            {packageDetail.packageName}
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">
            {packageDetail.description}
          </p>
          <p className="mb-3 font-normal text-primary-950">
            <span className="font-bold">
              {packageDetail.serviceDuration} Hari
            </span>{' '}
            Layanan
          </p>
          <section className="mb-4 flex flex-col items-center justify-between gap-2  md:flex-row">
            <h4 className="text-xl font-bold text-primary-500">
              {formatCurrency(packageDetail.price)},-
            </h4>
          </section>
        </section>
      </section>
      {packageDetail.destinations.length !== 0 &&
        packageDetail.destinations.map((destination, index) => (
          <DestinationDetails key={index} destinationData={destination} />
        ))}
      <div className="flex flex-row justify-end">
        <Button variant={'primary'}>Edit</Button>
      </div>
    </div>
  )
}

export default PackagesDetail
