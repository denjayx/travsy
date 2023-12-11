const AddPackage = () => {
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
                Tambah Package
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
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="namaPaket"
            >
              Package Name
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
              htmlFor="deskripsiPaket"
            >
              Deskripsi Package
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
              Harga Paket Per Orang
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="number"
              placeholder="harga paket nya yang per orang"
            ></input>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="thumbnail"
            >
              Gambar Thumbnail
            </label>
            <div className="flex items-start justify-start">
              <label className="hover:bg-blue flex w-64 cursor-pointer flex-col items-center rounded-lg border px-4 py-6 uppercase tracking-wide shadow-lg">
                <svg
                  className="h-6 w-6 text-white dark:text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    fill="currentColor"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  pilih gambar
                </span>
                <input type="file" className="hidden" id="image" />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="deskripsi"
            >
              Durasi Layanan
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
              Nama Destinasi
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="namaDestinasi"
              type="text"
              placeholder="Nama destinasi"
            ></input>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="deskripsi"
            >
              Kota
            </label>
            <div className="relative">
              <select
                id="kota"
                name="kota"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight 
                text-gray-700 shadow focus:outline-none"
              >
                <option value="" disabled selected>
                  Pilih kota
                </option>
                <option value="jakarta">Jakarta</option>
                <option value="surabaya">Surabaya</option>
                <option value="bandung">Bandung</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="thumbnail"
            >
              Gambar
            </label>
            <div className="flex items-start justify-start">
              <label className="hover:bg-blue aspect-w-1 aspect-h-1 flex w-64 cursor-pointer flex-col items-center rounded-lg border px-4 py-6 uppercase tracking-wide shadow-lg">
                <svg
                  className="h-6 w-6 text-white dark:text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    fill="currentColor"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  pilih gambar
                </span>
                <input type="file" className="hidden" id="image" />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="deskripsi"
            >
              Deskripsi
            </label>
            <textarea
              className="focus:shadow-outline w-full appearance-none 
              rounded border px-3 py-2 leading-tight text-gray-700 shadow 
              focus:outline-none"
              id="deskripsi"
              rows="4"
              placeholder="masukan desksripsi"
            ></textarea>
          </div>
          <div className="flex items-end justify-end">
            <button
              className="focus:shadow-outline rounded bg-primary-500 px-4 
              py-2 font-bold text-white hover:bg-primary-700 focus:outline-none"
              type="button"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddPackage
