/* eslint-disable react-hooks/exhaustive-deps */
import { FaCalendarDays } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { BASE_IMAGEURL, getHistoryDetail } from '../../data/api'
import { useOutletContext } from 'react-router-dom'
import { formatCurrency } from '../../../utils/utils'
import { Link } from 'react-router-dom'

const HistoryDetail = () => {
  const { id } = useParams()
  const { user } = useOutletContext()
  const [historyDetail, setHistoryDetail] = useState({
    tourGuide: {
      avatarUrl: '',
      firstName: '',
      lastName: '',
    },
    transaction: {
      id: '',
      package: {
        packageName: '',
      },
      status: '',
      orderDate: '',
      startDate: '',
      endDate: '',
      totalPerson: 0,
      totalPrice: 0,
    },
  })

  useEffect(() => {
    const fetchHistoryDetail = async () => {
      const { token } = user
      const historyDetail = await getHistoryDetail(token, id)
      setHistoryDetail(historyDetail)
    }
    if (user?.token) {
      fetchHistoryDetail()
    }
  }, [user, id])

  useEffect(() => {}, [historyDetail])

  return (
    <div className="item container mt-32 flex flex-col gap-2 text-primary-950 lg:flex-row">
      <div className="mx-3 flex h-full w-full flex-col gap-1 rounded-xl bg-white p-6 ">
        <div className="flex w-full flex-col gap-3 rounded-lg border-gray-200">
          <div className="flex items-center gap-2">
            <div className="flex w-8 items-center overflow-hidden rounded-full">
              <img
                src={BASE_IMAGEURL + historyDetail.tourGuide.avatarUrl}
                alt="tourguide avatar"
                className="avatar"
              />
            </div>
            <span>{`${historyDetail.tourGuide.firstName} ${historyDetail.tourGuide.lastName}`}</span>
          </div>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-primary-950">
            {historyDetail.transaction.package.packageName}
          </h5>
          <section className="flex flex-col items-center justify-between gap-2  md:flex-row">
            <h4 className="text-xl font-bold text-primary-500">
              {`${formatCurrency(historyDetail.transaction.totalPrice)}`}
            </h4>
          </section>
        </div>
        <div className="mb-1 flex flex-col items-center gap-1">
          <div className="relative flex w-full flex-col">
            <label className="mb-2 text-base font-normal text-gray-600">
              Tanggal Mulai
            </label>
            <p className="w-full rounded-xl border border-gray-200  px-4 py-2 text-primary-950">
              {historyDetail.transaction.startDate}
            </p>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-8 flex items-center px-3">
              <FaCalendarDays className="h-5 w-5 text-gray-500 " />
            </div>
          </div>

          <div className="relative flex w-full flex-col">
            <label className="mb-2 text-base font-normal text-gray-600">
              Tanggal Selesai
            </label>
            <p className="w-full rounded-xl border border-gray-200  px-4 py-2 text-primary-950">
              {historyDetail.transaction.endDate}
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
              <p className="relative w-full rounded-xl border border-gray-200 px-4 py-2 text-primary-950">
                {historyDetail.transaction.totalPerson}
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
              <p className="relative w-full rounded-xl border border-gray-200 px-4 py-2 text-primary-950">
                2023-12-08
              </p>
            </div>
          </div>
        </div>
        <Link to={'/packages'} className="text-center">
          <button
            type="submit"
            className="w-full rounded-3xl bg-primary-500 px-6 py-3 text-center text-base font-normal text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            Pesan Lagi
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HistoryDetail
