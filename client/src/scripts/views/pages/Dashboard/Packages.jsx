import { useEffect, useState } from 'react'
import { Link, NavLink, useOutletContext } from 'react-router-dom'
import { deletePackage, getProfilePackages } from '../../../data/api'

const Packages = () => {
  const [packageList, setPackageList] = useState([])
  const { user } = useOutletContext()

  useEffect(() => {
    const fetchPackageList = async (token) => {
      const result = await getProfilePackages(token)
      setPackageList(result)
    }

    if (user?.token) {
      fetchPackageList(user.token)
    }
  }, [user])

  const handleDelete = async (id) => {
    const { token } = user
    await deletePackage({ token, id })
    const result = await getProfilePackages(token)
    setPackageList(result)
  }

  return (
    <>
      {/* breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-2">
          <li className="inline-flex items-center">
            <a
              className="inline-flex items-center text-sm font-medium text-gray-700 
              hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
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
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 
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
                All packages
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* tombol tambah data */}
      <div className="flex items-end justify-end">
        <NavLink to="/dashboard/packages/add">
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama Paket
              </th>
              <th scope="col" className="px-6 py-3">
                Harga Paket
              </th>
              <th scope="col" className="px-6 py-3">
                Jumlah Transaksi
              </th>
              <th scope="col" className="px-6 py-3">
                aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {packageList.map((packageData) => (
              <tr
                key={packageData.id}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  <Link to={`${packageData.id}`}>
                    {packageData.packageName}
                  </Link>
                </th>
                <td className="px-6 py-4">{`Rp${packageData.price}`}</td>
                <td className="px-6 py-4">{packageData.transactionCount}</td>
                {/* <NavLink to="/dashboard/packages/details">
                  <button className="mx-1 my-2">
                    <svg
                      className="h-6 w-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                      <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                    </svg>
                  </button>
                </NavLink> */}
                <button
                  className="mx-1 my-2"
                  type="button"
                  onClick={() => handleDelete(packageData.id)}
                >
                  <svg
                    className="h-6 w-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                    />
                  </svg>
                </button>
              </tr>
            ))}
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
            className="bg-gray-400 px-3 py-2 text-gray-900 hover:bg-blue-600"
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

export default Packages
