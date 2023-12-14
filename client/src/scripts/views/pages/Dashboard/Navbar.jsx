// import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className="flex w-full items-center justify-between bg-gray-900 p-4 text-white">
        <div className="flex items-center space-x-4"></div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            Profile
          </a>
          <a href="#" className="hover:text-gray-300">
            Logout
          </a>
          <div className="relative">
            <button
              type="button"
              className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <img
                className="h-10 w-10 rounded-full"
                src="https://via.placeholder.com/150"
                alt="Profile"
              />
            </button>
            <div className="absolute right-0 z-10 mt-2 hidden w-48 rounded-lg bg-white py-2 text-gray-800 shadow-md">
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                Settings
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
