/* eslint-disable react/prop-types */
import { FaCaretDown } from 'react-icons/fa'
import AvatarImage from '../../../../assets/images/card-image.png'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Avatar = ({ user: { avatarUrl, firstName, lastName } }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 rounded-full bg-white p-3 px-4 font-medium text-primary-800"
      >
        <div className="h-10 w-10 overflow-hidden rounded-full outline outline-primary-400">
          <img
            src={AvatarImage}
            alt={`${firstName} ${lastName} avatar`}
            className="h-full w-full object-cover"
          />
        </div>
        <span>{`${firstName} ${lastName}`}</span>
        <FaCaretDown />
      </button>
      <ul
        className={`${!isOpen ? 'hidden' : 'block'} absolute right-0 bg-white`}
      >
        <li className="bg-whites flex flex-col">
          <NavLink to={'/'}>Profil</NavLink>
          <NavLink to={'/'}>Logout</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Avatar
