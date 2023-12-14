import { Outlet } from 'react-router-dom'
import Sidebar from '../pages/Dashboard/Sidebar'
import Navbar from '../pages/Dashboard/Navbar'

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 sm:ml-64">
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Dashboard
