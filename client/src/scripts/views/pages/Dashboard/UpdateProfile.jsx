// import React from 'react'

const UpdateProfile = () => {
  return (
    <>
      <div className="mb-2 rounded bg-white px-8 pb-14 pt-6 shadow-md">
        <form>
          <div className="mb-6 text-xl font-extrabold">Profile Anda</div>
          <div className="mb-4">
            <center>
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
                  Plih Gambar Profile
                </span>
                <input type="file" className="hidden" id="image" />
              </label>
            </center>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="accountID"
            >
              Account ID
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="accountID"
              type="text"
              placeholder="Account ID"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="fullName"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="biography"
            >
              Biography
            </label>
            <textarea
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="biography"
              placeholder="Biography"
            >
              BIOGRAPHY
            </textarea>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="fullName"
            >
              NIK
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="fullName"
              type="text"
              placeholder="nomor nik ktp"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="fullName"
            >
              Phone
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="fullName"
              type="text"
              placeholder="Nomor Telepon"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="fullName"
            >
              Province
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="fullName"
              type="text"
              placeholder="Nama Provinsi"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="fullName"
            >
              City
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="fullName"
              type="text"
              placeholder="Nama kota"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="fullName"
            >
              Gender
            </label>
            <select
              id="jenis_kelamin"
              name="jenis_kelamin"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight 
                text-gray-700 shadow focus:outline-none"
            >
              <option value="" disabled selected>
                Pilih Jenis Kelamin
              </option>
              <option value="jakarta">Laki-Laki</option>
              <option value="surabaya">Perempuan</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="fullName"
            >
              Card Number
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="fullName"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div className="float-right">
            <button
              className="rounded bg-primary-500 px-4 py-2 font-bold 
          text-white hover:bg-primary-600"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UpdateProfile
