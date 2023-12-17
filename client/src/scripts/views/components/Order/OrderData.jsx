import { FaCalendarDays } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const OrderData = () => {
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate('/packages/:id')
  }
  return (
    <div className=" mx-3 flex h-full w-full flex-col gap-1 rounded-xl bg-white p-6 lg:w-2/4 ">
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

      <div className="text-center flex gap-5">
        <button
          type="submit"
          className="w-full rounded-3xl bg-primary-500 px-6 py-3 text-center text-base font-normal text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          onClick={handleEdit}
        >
          Ubah Pesanan
        </button>
        <button
          type="submit"
          className="w-full rounded-3xl border border-primary-500 px-6 py-3 text-center text-base font-normal text-primary-600 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          
        >
          Sudah Yakin
        </button>
      </div>
    </div>
  )
}

export default OrderData
