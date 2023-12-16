import { NavLink } from 'react-router-dom'

const Orders = () => {
  return (
    <>
      {/* breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-2">
          <li className="inline-flex items-center">
            <a
              className="hover:text-blue-600 inline-flex items-center text-sm font-medium 
            text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
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
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
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
              <a
                className="hover:text-blue-600 ms-1 text-sm font-medium text-gray-700 
              dark:text-gray-400 dark:hover:text-white md:ms-2"
              >
                Dashboard
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
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
              <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                All Orders
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* button tambah data */}
      <div className="flex items-end justify-end">
        <NavLink to="/dashboard/orders/add">
          <button className="m-2 rounded bg-primary-500 px-4 py-2 font-bold text-white hover:bg-primary-700">
            Tambah data
          </button>
        </NavLink>
      </div>

      {/* bagian search */}
      <input
        type="text"
        placeholder="Cari data..."
        className="mb-2 h-8 rounded-full border-2 border-gray-300 bg-white px-5 pr-10 text-sm focus:outline-none"
      />

      {/* bagian table */}
      <div className="relative overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama Paket
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Pemesanan
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                paket wisata tanah lot
              </th>
              <td className="px-6 py-4">rahman islam</td>
              <td className="px-6 py-4">pending</td>
              <td className="px-6 py-4">10/12/2023</td>
              <button className="mr-2 mt-2 rounded bg-primary-500 px-4 py-2 font-bold text-white hover:bg-primary-600">
                Konfirmasi
              </button>
              <button className="mr-2 rounded bg-primary-500 px-4 py-2 font-bold text-white hover:bg-primary-600">
                Tolak
              </button>
              <NavLink to="/dashboard/orders/details">
                <button className="mr-2 rounded bg-primary-500 px-4 py-2 font-bold text-white hover:bg-primary-600">
                  Edit
                </button>
              </NavLink>
              <button className="mt-2 rounded bg-primary-500 px-4 py-2 font-bold text-white hover:bg-primary-600">
                Hapus
              </button>
            </tr>
          </tbody>
        </table>
      </div>

      {/* bagian pagination */}
      <div className="my-4 flex justify-start">
        <nav className="inline-flex rounded-md shadow">
          <a
            href="#"
            className="rounded-l-md bg-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-300"
          >
            &laquo;
          </a>
          <a
            href="#"
            className="hover:bg-blue-600 bg-gray-400 px-3 py-2 text-gray-900"
          >
            1
          </a>
          <a
            href="#"
            className="bg-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-300"
          >
            2
          </a>
          <a
            href="#"
            className="rounded-r-md bg-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-300"
          >
            &raquo;
          </a>
        </nav>
      </div>
    </>
  )
}

export default Orders
