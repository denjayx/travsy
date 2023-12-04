import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import Paragraph from '../Paragraph/Paragraph'

const Footer = () => {
  return (
    <section className="container grid gap-6 py-12 text-white md:w-auto lg:grid-cols-2 lg:gap-12">
      <div id="desc">
        <Logo variant="white" />
        <Paragraph color="white">
          Jelajahi keindahan pulau Bali dengan pilihan destinasi menarik dari
          kami. Setiap tempat memiliki cerita dan keunikan tersendiri yang
          menunggu untuk Anda temukan.Yuk segera pesan layanan kami.
        </Paragraph>
      </div>
      <div
        id="links"
        className="grid gap-6 md:grid-cols-3 md:place-content-start"
      >
        <div id="link" className="flex flex-col">
          <h5 className="mb-1 text-md font-semibold text-white">Tautan</h5>
          <Link to="/package">Paket Wisata</Link>
          <Link to="/history">Riwayat</Link>
        </div>
        <div id="link" className="flex flex-col">
          <h5 className="mb-1 text-md font-semibold text-white">Layanan</h5>
          <Link to="/package">Tour Guide</Link>
          <Link to="/package">Paket Wisata</Link>
        </div>
        <div id="link" className="flex flex-col">
          <h5 className="mb-1 text-md font-semibold text-white">Layanan</h5>
          <a href="mailto:official@travsy.id">Kontak</a>
          <a
            href="https://maps.app.goo.gl/wwFZcdusFQdEB3fz5"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sleman, Yogyakarta
          </a>
        </div>
      </div>
    </section>
  )
}

export default Footer
