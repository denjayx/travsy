import { NavLink } from 'react-router-dom'
import Button from '../Buttons/Button'
import HeroImage from '../../../../assets/images/hero-image.png'
import HeroIcon from '../../../../assets/images/hero-icon.png'
import Paragraph from '../Paragraph/Paragraph'

const Hero = () => {
  return (
    <section className="container mt-40 flex flex-col items-center justify-between lg:flex-row">
      <div className="flex h-full flex-col gap-8 lg:w-6/12">
        <h1 className="text-3xl font-bold text-primary-950">
          Solusi healing <span className="text-primary-700">tanpa pusing.</span>
        </h1>
        <Paragraph>
          Jelajahi keindahan pulau Bali dengan pilihan destinasi menarik dari
          kami. Setiap tempat memiliki cerita dan keunikan tersendiri yang
          menunggu untuk Anda temukan.Yuk segera pesan layanan kami.
        </Paragraph>
        <div className="flex gap-2">
          <NavLink to="/package">
            <Button variant="secondary">Mulai Trip</Button>
          </NavLink>
          <NavLink to="/register">
            <Button variant="primary">Jadi Tourguide</Button>
          </NavLink>
        </div>
        <div className="mt-12 flex items-center justify-start gap-2">
          <svg
            className="h-2 w-2 text-primary-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
          <Button className="w-fit text-primary-700">Jelajahi</Button>
        </div>
      </div>
      <div className="hero-image relative lg:w-5/12">
        <img
          src={HeroIcon}
          alt="Plans Icon"
          className="absolute inset-x-0 left-24 top-28"
        />
        <img src={HeroImage} alt="Hero" className="hidden w-full lg:block" />
      </div>
    </section>
  )
}

export default Hero
