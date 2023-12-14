// import React from 'react'

const Profile = () => {
  return (
    <>
      <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
        <center>
          <div className="m-2 text-xl font-extrabold">Profile Anda</div>
        </center>
        <div className="md:flex">
          <div className="mx-auto md:flex-shrink-0">
            <img
              className="mt-4 h-48 w-full rounded-lg border-4 border-gray-300 object-cover md:h-48 md:w-48"
              src="https://mm.feb.uncen.ac.id/wp-content/uploads/2016/01/tutor-8.jpg"
              alt="User Avatar"
            />
          </div>
          <div className="mt-2 pb-10 pr-10">
            <div className="text-indigo-500 text-m font-semibold uppercase tracking-wide">
              Username: USERNAME
            </div>
            <div className="mt-2">
              <p className="text-gray-500">
                <b className="text-gray-950">Account ID:</b> ACCOUNTID
              </p>
              <p className="text-gray-500">
                <b className="text-gray-950">Full Name:</b> FIRSTNAME LASTNAME
              </p>
              <p className="text-gray-500">
                <b className="text-gray-950">Biography:</b> BIOGRAPHY
              </p>
              <p className="text-gray-500">
                <b className="text-gray-950">NIK:</b> NIK_NUMBER
              </p>
              <p className="text-gray-500">
                <b className="text-gray-950">Phone:</b> PHONE_NUMBER
              </p>
              <p className="text-gray-500">
                <b className="text-gray-950">Province:</b> PROVINCE
              </p>
              <p className="text-gray-500">
                <b className="text-gray-950">City:</b> CITY
              </p>
              <p className="text-gray-500">
                <b className="text-gray-950">Gender:</b> GENDER
              </p>
              <p className="text-gray-500">
                <b className="text-gray-950">Card Number:</b> CARD_NUMBER
              </p>
            </div>
          </div>
        </div>
        <div className="float-right">
          <button className="-mt-3 mb-4 mr-4 rounded bg-primary-500 px-4 py-2 font-bold text-white hover:bg-primary-600">
            Ubah Profil
          </button>
        </div>
      </div>
    </>
  )
}

export default Profile
