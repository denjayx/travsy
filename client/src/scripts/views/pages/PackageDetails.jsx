import CardImage from '../../../assets/images/card-image.png'
import Avatar from '../../../assets/avatar.png'

export default function PackageDetails() {
  return (
    <section id="packagedetails" className="flex flex-col ">
      <img
        src={CardImage}
        alt="Thumbnail Card"
        className="h-full w-full object-cover"
      />
       <header className="tourguide flex items-center justify-start gap-2">
        <img
          src={Avatar}
          width="32px"
          alt="tourguide avatar"
          className="avatar"
        />
        <span className="text-sm text-primary-950">Abram Saris</span>
      </header>
    </section>
  )
}
