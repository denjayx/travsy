/* eslint-disable react/prop-types */
import OrderForm from './OrderForm'
import { useState } from 'react'
import { BASE_IMAGEURL } from '../../../data/api'
import defaultUser from '../../../../assets/default-user.svg'
import { formatCurrency } from '../../../../utils/utils'

const PackageDetails = ({ packageData, token }) => {
  const [showOrderForm, setShowOrderForm] = useState(false)

  const handlePesanSekarang = () => {
    setShowOrderForm(true)
  }

  return (
    <section
      id="packagedetails"
      className=" flex w-full flex-col items-center gap-6 rounded-xl lg:flex-row "
    >
      <div className="h-full w-full overflow-hidden rounded-lg md:rounded-l-lg lg:w-5/12">
        <img
          src={BASE_IMAGEURL + packageData.package.thumbnailUrl}
          alt="Thumbnail Card"
          className=" h-full w-full object-cover "
        />
      </div>
      <section className="flex h-full w-full flex-col justify-between gap-1 rounded-lg border-gray-200 bg-white p-5 md:rounded-l-lg">
        <div className="mb-3 flex items-center gap-3">
          <img
            src={
              packageData.tourGuide.avatarUrl
                ? BASE_IMAGEURL + packageData.tourGuide.avatarUrl
                : defaultUser
            }
            width="32px"
            alt="tourguide avatar"
            className="avatar"
          />
          <span>
            {`${
              packageData.tourGuide.firstName
                ? packageData.tourGuide.firstName +
                  ' ' +
                  (packageData.tourGuide.lastName || '')
                : packageData.tourGuide.username
            }`}
          </span>
        </div>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-primary-950">
          {packageData.package.packageName}
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">
          {packageData.package.description}
        </p>
        <p className="mb-3 font-normal text-primary-950">
          <span className="font-bold">
            {packageData.package.serviceDuration} Hari
          </span>{' '}
          Layanan
        </p>
        <section className="mb-4 flex flex-col items-center justify-between gap-2  md:flex-row">
          <h4 className="text-xl font-bold text-primary-500">
            {formatCurrency(packageData.package.price)},-
          </h4>
          {!showOrderForm && (
            <div className="relative">
              <button
                type="button"
                className="rounded-3xl bg-primary-500 px-6 py-3 text-center text-base font-normal text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={handlePesanSekarang}
              >
                Pesan Sekarang
              </button>
            </div>
          )}
        </section>
      </section>
      {showOrderForm && (
        <OrderForm packageData={packageData.package} token={token} />
      )}
    </section>
  )
}

export default PackageDetails
