import { useEffect, useState } from 'react'
import { NavLink, useOutletContext, useParams } from 'react-router-dom'
import { getProfilePackageDetail } from '../../../data/api'
import DestinationDetails from '../../components/Details/DestinationDetails'

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
    console.log(packageDetail)
  }, [id, user])

  return (
    <>
      {/* breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-2">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="me-2.5 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <NavLink to="/dashboard/packages">
                <a className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ms-2">
                  Dashboard
                </a>
              </NavLink>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                Detail packages
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <section
        id="packagedetails"
        className=" flex w-full flex-col items-center gap-6 rounded-xl lg:flex-row "
      >
        <div className="h-full w-full overflow-hidden rounded-lg md:rounded-l-lg lg:w-5/12">
          <img
            src={packageDetail.thumbnailUrl}
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
    </>
  )
}

export default PackagesDetail
