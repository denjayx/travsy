const DetailOrder = () => {
  return (
    <>
      {/* breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-2">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="hover:text-blue-600 inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400 dark:hover:text-white"
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
                href="#"
                className="hover:text-blue-600 ms-1 text-sm font-medium text-gray-700 dark:text-gray-400 dark:hover:text-white md:ms-2"
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
                Detail Order
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* form detail */}
      <div className=" mt-8 ">
        <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700 underline"
              htmlFor="username"
            >
              0aeaef33-40ae-3a30-ae0e-307ae2de4c1e
            </label>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="namaPemesan"
            >
              Nama Pemesan
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="namaPaket"
              type="text"
              placeholder="masukan nama paket"
            ></input>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="namaPaket"
            >
              Nama Paket
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="deskripsiPaket"
              type="text"
              placeholder="deskripsi paket"
            ></input>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="price"
            >
              Tanggal Mulai
            </label>
            <input
              type="date"
              id="datepicker"
              name="datepicker"
              className="mb-3 block w-full appearance-none rounded border px-4 py-3 leading-tight 
              text-gray-700 focus:bg-white focus:outline-none"
            ></input>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="price"
            >
              Tanggal Selesai
            </label>
            <input
              type="date"
              id="datepicker"
              name="datepicker"
              className="mb-3 block w-full appearance-none rounded border px-4 py-3 leading-tight 
              text-gray-700 focus:bg-white focus:outline-none"
            ></input>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="deskripsi"
            >
              Jumlah Orang
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="durasiLayanan"
              type="number"
              placeholder="Berapa Hari"
            ></input>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="deskripsi"
            >
              Total Harga
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="namaDestinasi"
              type="number"
              placeholder="Nama destinasi"
            ></input>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="deskripsi"
            >
              Tanggal Pemesanan
            </label>
            <input
              type="date"
              id="datepicker"
              name="datepicker"
              className="mb-3 block w-full appearance-none rounded border px-4 py-3 leading-tight 
              text-gray-700 focus:bg-white focus:outline-none"
            ></input>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="deskripsi"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              className="block w-full appearance-none rounded border border-gray-200 
             px-4 py-3 pr-8 leading-tight
            focus:bg-white focus:outline-none"
            >
              <option value="" disabled selected>
                Pilih status
              </option>
              <option value="terkonfirmasi">Terkonfirmasi</option>
              <option value="pending">Pending</option>
              <option value="ditolak">Ditolak</option>
            </select>
          </div>
          <div className="flex items-end justify-end">
            <button
              className="focus:shadow-outline rounded bg-primary-500 px-4 
              py-2 font-bold text-white hover:bg-primary-700 focus:outline-none"
              type="button"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default DetailOrder
