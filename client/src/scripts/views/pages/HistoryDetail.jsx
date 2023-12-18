import CardImageFull from '../../../assets/images/card-image-full.png'
import Avatar from '../../../assets/avatar.png'
import { FaCalendarDays } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const HistoryDetail = () => {
  const navigate = useNavigate()
  const handleConfirm = () => {
    navigate('/package')
  }
  return (
    <div className="item container mt-32 flex flex-col gap-2 lg:flex-row ">
      <section
        id="packagehistory"
        className=" container mx-3 flex w-full flex-col items-center gap-7 rounded-xl bg-white p-6 "
      >
        <div className="w-full overflow-hidden rounded-lg md:rounded-l-lg ">
          <img
            src={CardImageFull}
            alt="Thumbnail Card"
            className=" h-full w-full object-cover "
          />
        </div>
        <section className="flex w-full flex-col gap-1 rounded-lg border-gray-200  ">
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
          </section>
        </section>
      </section>

      <div className=" mx-3 flex h-full w-2/4 flex-col gap-1 rounded-xl bg-white p-6 ">
        <h4 className="mb-2 text-md font-semibold text-primary-950">
          Data Pesanan
        </h4>
        <div className="mb-1 flex flex-col items-center gap-1">
          <div className="relative flex w-full flex-col">
            <label className="mb-2 text-base font-normal text-gray-600">
              Tanggal Mulai
            </label>
            <p className="w-full rounded-xl border border-primary-200  px-4 py-2 text-primary-950">
              2023-12-08
            </p>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-8 flex items-center px-3">
              <FaCalendarDays className="h-5 w-5 text-gray-500 " />
            </div>
          </div>

          <div className="relative flex w-full flex-col">
            <label className="mb-2 text-base font-normal text-gray-600">
              Tanggal Selesai
            </label>
            <p className="w-full rounded-xl border border-primary-200  px-4 py-2 text-primary-950">
              2023-12-08
            </p>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-8 flex items-center px-3">
              <FaCalendarDays className="h-5 w-5 text-gray-500 " />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="mb-2 text-base font-normal text-gray-600">
            Jumlah Tiket
          </label>
          <div className=" flex items-center ">
            <div className="relative flex w-full">
              <p className="relative w-full rounded-xl border border-primary-200 px-4 py-2 text-primary-950">
                1
              </p>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="mb-2 text-base font-normal text-gray-600">
            Tanggal Pemesanan
          </label>
          <div className=" flex items-center ">
            <div className="relative flex w-full">
              <p className="relative w-full rounded-xl border border-primary-200 px-4 py-2 text-primary-950">
                2023-12-08
              </p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full rounded-3xl bg-primary-500 px-6 py-3 text-center text-base font-normal text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-blue-300 "
            onClick={handleConfirm}
          >
            Pesan Lagi
          </button>
        </div>
      </div>
    </div>
  )
}

export default HistoryDetail
