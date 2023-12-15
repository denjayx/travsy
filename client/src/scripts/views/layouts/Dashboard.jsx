import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import Sidebar from '../pages/Dashboard/Sidebar'
import { useEffect } from 'react'

const Dashboard = () => {
  const { user } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.token) {
      navigate('/')
    } else {
      navigate('packages')
    }
  }, [])

  return (
    <>
      <div className="mt-32 p-4 sm:ml-64">
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Dashboard
