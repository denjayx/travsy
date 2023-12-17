/* eslint-disable react/prop-types */
import Labels from '../Labels/Lables'
import { NavLink } from 'react-router-dom'
import { BASE_IMAGEURL } from '../../../data/api'
import defaultUser from '../../../../assets/default-user.svg'

const Card = ({ packagesData, tourguideData, cardId }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl bg-white p-6 max-lg:flex-shrink-0`}
    >
      <NavLink to={`/packages/${cardId}`} className="flex flex-col gap-3">
        <figure className="h-64 w-full overflow-hidden rounded-lg">
          <img
            src={BASE_IMAGEURL + packagesData.thumbnailUrl}
            alt="Thumbnail Card"
            className="h-full w-full object-cover"
          />
        </figure>
        <header className="tourguide flex items-center justify-start gap-2">
          <img
            src={
              tourguideData.avatarUrl
                ? `${BASE_IMAGEURL + tourguideData.avatarUrl}`
                : defaultUser
            }
            width="32px"
            alt="tourguide avatar"
            className="avatar"
          />
          <span className="text-sm text-primary-950">
            {`${tourguideData.firstName} ${tourguideData.lastName}`}
          </span>
        </header>
        <h4 className="text-md font-semibold text-primary-950">
          {`${packagesData.packageName.substr(0, 120)}...`}
        </h4>
        <span className="text-md font-semibold text-primary-600">
          {`${formatCurrency(packagesData.price)}`}
        </span>
        <footer className="flex overflow-x-scroll">
          {packagesData.destinations.map((destination, index) => {
            return (
              <Labels
                className="flex-shrink-0"
                key={index}
                city={destination.destinationName}
              />
            )
          })}
        </footer>
      </NavLink>
    </article>
  )
}

export default Card
