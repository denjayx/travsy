import logowhite from "../../../../assets/logo-white.svg";

const Footer = () => {
  return (
    <footer className="bg-primary-500">
      <div className="flex flex-col md:flex-row md:gap-10 gap-16 items-start justify-start w-full">
        <div className="flex flex-col gap-2.5 items-start justify-start">
          <img className="w-20 h-20 md:w-auto md:h-auto" src={logowhite} alt="logo_One" />
          <span className="md:max-w-full text-base text-white">
            Jelajahi keindahan pulau Bali dengan pilihan destinasi menarik dari kami. Setiap tempat memiliki cerita dan keunikan tersendiri yang menunggu untuk Anda temukan. Yuk segera pesan layanan kami.
          </span>
        </div>
        <div className="flex flex-col gap-4 items-start justify-start w-auto">
          <span className="text-white text-xl w-auto">Tautan</span>
          <div className="flex flex-col gap-[5px] items-start justify-start w-auto">
            <span className="text-base text-white w-auto">Paket Wisata</span>
            <span className="text-base text-white w-auto">Riwayat</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-start justify-start w-auto">
          <span className="text-white text-xl w-auto">Layanan</span>
          <div className="flex flex-col items-start justify-start w-auto">
            <span className="text-base text-white w-auto">Tour Guide</span>
            <span className="text-base text-white w-auto">Paket Wisata</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-start justify-start w-auto">
          <span className="text-white text-xl w-auto">Kontak</span>
          <div className="flex flex-col items-start justify-start w-auto">
            <span className="text-base text-white w-auto">official@travsy.id</span>
            <span className="text-base text-white w-auto">Sleman, Yogyakarta</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
