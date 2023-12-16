// import React from 'react'

const UpdateProfile = () => {
  return (
    <>
      <div className="mb-2 rounded bg-white px-8 pb-14 pt-6 shadow-md">
        <form>
          <div className="mb-6 text-xl font-extrabold">Profile Anda</div>
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
