/* eslint-disable react/prop-types */
import CardImage from '../../../../assets/images/card-image.png'
import Avatar from '../../../../assets/avatar.png'
import Labels from '../Labels/Lables'
import { NavLink } from 'react-router-dom'

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
            src={CardImage}
            alt="Thumbnail Card"
            className="h-full w-full object-cover"
          />
        </figure>
        <header className="tourguide flex items-center justify-start gap-2">
          <img
            src={Avatar}
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
                city={destination.city}
              />
            )
          })}
        </footer>
      </NavLink>
    </article>
  )
}

export default Card
