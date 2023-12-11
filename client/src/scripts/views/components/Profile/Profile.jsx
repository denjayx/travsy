/* eslint-disable react/prop-types */
import { FaCaretDown } from 'react-icons/fa'
import AvatarImage from '../../../../assets/images/card-image.png'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../Buttons/Button'

const Profile = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  const [isOpen, setIsOpen] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const avatarUrl = user?.avatarUrl || AvatarImage
  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 rounded-full bg-white p-3 px-4 font-medium text-primary-800"
      >
        <div className="h-10 w-10 overflow-hidden rounded-full outline outline-primary-400">
          <img
            src={AvatarImage}
            alt={`${fullName} avatar`}
            className="h-full w-full object-cover"
          />
        </div>
        <span>{`${fullName}`}</span>
        <FaCaretDown />
      </button>
      <ul
        className={`${!isOpen ? 'hidden' : 'block'} absolute right-0 bg-white`}
      >
        <li className="bg-whites flex flex-col">
          <NavLink to={'/'}>Profil</NavLink>
          <Button onClick={handleLogout}>Keluar</Button>
        </li>
      </ul>
    </div>
  )
}

export default Profile
