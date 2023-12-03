import logowhite from '../../../../assets/logo-white.svg'

const Footer = () => {
  return (
    <footer className="bg-primary-500">
      <div className="flex w-full flex-col items-start justify-start gap-16 md:flex-row md:gap-10">
        <div className="flex flex-col items-start justify-start gap-2.5">
          <img
            className="h-20 w-20 md:h-auto md:w-auto"
            src={logowhite}
            alt="logo_One"
          />
          <span className="text-base text-white md:max-w-full">
            Jelajahi keindahan pulau Bali dengan pilihan destinasi menarik dari
            kami. Setiap tempat memiliki cerita dan keunikan tersendiri yang
            menunggu untuk Anda temukan. Yuk segera pesan layanan kami.
          </span>
        </div>
        <div className="flex w-auto flex-col items-start justify-start gap-4">
          <span className="w-auto text-xl text-white">Tautan</span>
          <div className="flex w-auto flex-col items-start justify-start gap-[5px]">
            <span className="w-auto text-base text-white">Paket Wisata</span>
            <span className="w-auto text-base text-white">Riwayat</span>
          </div>
        </div>
        <div className="flex w-auto flex-col items-start justify-start gap-4">
          <span className="w-auto text-xl text-white">Layanan</span>
          <div className="flex w-auto flex-col items-start justify-start">
            <span className="w-auto text-base text-white">Tour Guide</span>
            <span className="w-auto text-base text-white">Paket Wisata</span>
          </div>
        </div>
        <div className="flex w-auto flex-col items-start justify-start gap-4">
          <span className="w-auto text-xl text-white">Kontak</span>
          <div className="flex w-auto flex-col items-start justify-start">
            <span className="w-auto text-base text-white">
              official@travsy.id
            </span>
            <span className="w-auto text-base text-white">
              Sleman, Yogyakarta
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
