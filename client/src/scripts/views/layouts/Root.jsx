import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function Root() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchRevalidate = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        const user = await revalidate(token)
        if (user) {
          setUser(user)
        }
      } else {
        setUser({
          token: '',
          role: '',
          user: {
            username: '',
            avatarUrl: '',
            firstName: '',
            lastName: '',
          },
        })
      }
    }
  }, [])
  return (
    <>
      <Outlet context={{ user, setUser }} />
    </>
  )
}
