import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function Root() {
  const [user, setUser] = useState({
    token: '',
    role: '',
    user: {
      username: '',
      avatarUrl: '',
      firstName: '',
      lastName: '',
    },
  })
  useEffect(() => {
    const userStorage = localStorage.getItem('user')
    if (userStorage) {
      setUser(userStorage)
    }
  }, [])
  return (
    <>
      <Outlet context={{ user, setUser }} />
    </>
  )
}
