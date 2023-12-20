import { useEffect, useState } from 'react'
import Button from '../../components/Buttons/Button'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { getOrderList, updateStatusOrder } from '../../../data/api'

const Orders = () => {
  const [orderList, setOrderList] = useState([])
  const { user } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrderList = async (token) => {
      const result = await getOrderList(token)
      setOrderList(result)
    }

    if (user?.token) {
      fetchOrderList(user.token)
    }
  }, [user])

  const handleChangeStatus = async (id, status) => {
    await updateStatusOrder(user.token, id, status)
    navigate(0)
  }

  return (
    <div className="flex w-full flex-col gap-3 p-10">
      {/* breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-2">
          <li className="inline-flex items-center">
            <span className="inline-flex items-center text-sm font-medium text-primary-700">
              <svg
                className="me-2.5 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </span>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="mx-1 h-3 w-3 text-primary-400 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span
                className="inline-flex items-center text-sm font-medium 
              text-primary-700"
              >
                Pesanan
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* bagian table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-center text-sm text-primary-500 rtl:text-right">
          <thead className="bg-primary-50 text-xs uppercase text-primary-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama Paket{' '}
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Pemesan
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal
              </th>
              <th scope="col" className="px-6 py-3">
                aksi
              </th>
            </tr>
          </thead>
          <tbody className="leading-5">
            {orderList.map((orderData) => (
              <tr
                key={orderData.transaction.id}
                className="border-b bg-white hover:bg-primary-50 "
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-primary-900 "
                >
                  {orderData.transaction.package.packageName}
                </th>
                <td className="px-6 py-4">{orderData.tourist.username}</td>
                <td className="px-6 py-4">{orderData.transaction.orderDate}</td>
                <td className="flex justify-center gap-1 px-6 py-4">
                  {orderData.transaction.status !== 'menunggu' ? (
                    <span
                      className={`uppercase ${
                        orderData.transaction.status === 'terkonfirmasi'
                          ? 'text-primary-500'
                          : 'text-red-500'
                      }`}
                    >
                      {orderData.transaction.status}
                    </span>
                  ) : (
                    <>
                      <Button
                        variant={'primary'}
                        type={'button'}
                        onClick={() =>
                          handleChangeStatus(
                            orderData.transaction.id,
                            'terkonfirmasi',
                          )
                        }
                      >
                        Konfirmasi
                      </Button>
                      <Button
                        text-white
                        shadow-btn
                        duration-300
                        ease-in-out
                        variant={'primary'}
                        className={`border-red-500 bg-red-500 hover:bg-red-600`}
                        onClick={() =>
                          handleChangeStatus(
                            orderData.transaction.id,
                            'ditolak',
                          )
                        }
                      >
                        Tolak
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
