/* eslint-disable react/prop-types */
import CardImage from '../../../../assets/images/card-image.png'
import Avatar from '../../../../assets/avatar.png'
import OrderForm from './OrderForm'
import { useState } from 'react'

const PackageDetails = ({ packageData }) => {
  const [showOrderForm, setShowOrderForm] = useState(false)

  const handlePesanSekarang = () => {
    setShowOrderForm(true)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section
      id="packagedetails"
      className=" flex w-full flex-col items-center gap-6 rounded-xl lg:flex-row "
    >
      <div className="h-full w-full overflow-hidden rounded-lg md:rounded-l-lg lg:w-5/12">
        <img
          src={packageData.package.thumbnailUrl}
          alt="Thumbnail Card"
          className=" h-full w-full object-cover "
        />
      </div>
      <section className="flex h-full w-full flex-col justify-between gap-1 rounded-lg border-gray-200 bg-white p-5 md:rounded-l-lg">
        <div className="flex items-center">
          <img
            src={packageData.tourGuide.avatarUrl}
            width="32px"
            alt="tourguide avatar"
            className="avatar"
          />
          <span>
            {packageData.tourGuide.firstName +
              ' ' +
              packageData.tourGuide.lastName}
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
      {showOrderForm && <OrderForm />}
    </section>
  )
}

export default PackageDetails
