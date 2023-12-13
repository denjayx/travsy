import CardImage from '../../../../assets/images/card-image.png'
import Avatar from '../../../../assets/avatar.png'

export default function PackageDetails() {
  return (
    <section
      id="packagedetails"
      className=" flex w-full flex-col items-center gap-6 rounded-lg lg:flex-row "
    >
      <div className='h-full w-full rounded-lg md:rounded-l-lg lg:w-5/12 overflow-hidden'>
        <img
          src={CardImage}
          alt="Thumbnail Card"
          className=" object-cover w-full h-full "
        />
      </div>
      <section className="flex h-full w-full flex-col justify-between gap-1 rounded-lg border-gray-200 bg-white p-5 md:rounded-l-lg">
        <div className="flex items-center">
          <img
            src={Avatar}
            width="32px"
            alt="tourguide avatar"
            className="avatar"
          />
          <span>Abram Saris</span>
        </div>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-primary-950">
          Pura Tanah Lot - Pura Uluwatu - Pantai Kuta
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">
          Lorem ipsum dolor sit amet consectetur. Convallis montes nulla cras
          in. Ut viverra odio et pharetra dictum nunc ultrices. Mattis lorem
          amet egestas blandit ut. Sed hendrerit convallis scelerisque arcu
          pulvinar id at.
        </p>
        <p className="mb-3 font-normal text-primary-950">
          <span className="font-bold">3 Hari</span> Layanan
        </p>
        <section className="mb-4 flex flex-col items-center justify-between gap-2  md:flex-row">
          <h4 className="text-xl font-bold text-primary-500">Rp500.000,-</h4>
          <button
            type="submit"
            className="focus:ring-blue-300  rounded-3xl bg-primary-500 px-6 py-3
          text-center text-base font-normal text-white hover:bg-primary-600 focus:outline-none focus:ring-4"
          >
            Pesan Sekarang
          </button>
        </section>
      </section>
    </section>
  )
}
