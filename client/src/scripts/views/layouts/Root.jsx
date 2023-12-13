import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { revalidate } from '../../data/api'

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
    const fetchRevalidate = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        const user = await revalidate(token)
        if (user) {
          setUser(user)
        }
      }
    }

    fetchRevalidate()
  }, [])

  return (
    <>
      <Outlet context={{ user, setUser }} />
    </>
  )
}
