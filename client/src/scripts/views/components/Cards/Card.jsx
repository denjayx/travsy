import CardImage from '../../../../assets/images/card-image.png'
import Avatar from '../../../../assets/avatar.png'
import Labels from '../Labels/Lables'

const Card = () => {
  return (
    <article className="flex flex-col gap-4 rounded-2xl bg-white p-6 max-xl:flex-shrink-0 max-md:w-full md:w-6/12 lg:w-4/12">
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
        <span className="text-sm text-primary-950">Abram Saris</span>
      </header>
      <h4 className="text-md font-semibold text-primary-950">
        Pura Tanah Lot - Pura Uluwatu - Pantai Kuta
      </h4>
        <h1 className="text-md font-bold text-primary-500">
          Rp.320.000
        </h1>
      <footer>
        <Labels>Tanah Lot</Labels>
        <Labels>Uluwatu</Labels>
        <Labels>Pantai Kuta</Labels>
      </footer>


    </article>
  )
}

export default Card
