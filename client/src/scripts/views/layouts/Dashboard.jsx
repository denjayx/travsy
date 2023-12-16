import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [loadContext, setLoadContext] = useState(true)
  const { user } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setLoadContext(false)
    }
  }, [user])

  useEffect(() => {
    if (!loadContext) {
      if (!user.token) {
        navigate('/')
      }
    }
  }, [loadContext, user, navigate])

  return (
    <>
      <div className="mt-32 p-4 sm:ml-64">
        <Outlet context={useOutletContext()} />
      </div>
    </>
  )
}

export default Dashboard
