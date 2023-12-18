/* eslint-disable react/prop-types */
import { FaCaretDown } from 'react-icons/fa'
// import AvatarImage from '../../../../assets/images/card-image.png'
import defaultUser from '../../../../assets/default-user.svg'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../Buttons/Button'
import { BASE_IMAGEURL } from '../../../data/api'

const Profile = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  const [isOpen, setIsOpen] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const avatarUrl = user?.avatarUrl
    ? `${BASE_IMAGEURL + user?.avatarUrl}`
    : defaultUser
  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 rounded-full bg-white p-3 px-4 font-medium text-primary-800"
      >
        <div className="h-10 w-10 overflow-hidden rounded-full outline outline-primary-400">
          <img
            src={avatarUrl}
            alt={`${fullName} avatar`}
            className="h-full w-full object-cover"
          />
        </div>
        <span>{`${fullName == undefined || user?.username}`}</span>
        <FaCaretDown />
      </button>
      <ul
        className={`${
          !isOpen
            ? 'pointer-events-none scale-95 transform opacity-0'
            : 'pointer-events-auto scale-100 transform opacity-100'
        }  absolute right-0 mt-6 flex flex-col gap-4 rounded-xl bg-white p-6 text-center transition-all duration-100 ease-in-out md:mt-4`}
      >
        <li>
          <NavLink className="font-medium text-primary-700" to={'/profile'}>
            Profil
          </NavLink>
        </li>
        <li>
          <NavLink className="font-medium text-primary-700" to={'/dashboard'}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <Button
            variant="text"
            className="font-medium text-red-600"
            onClick={handleLogout}
          >
            Keluar
          </Button>
        </li>
      </ul>
    </div>
  )
}

export default Profile
