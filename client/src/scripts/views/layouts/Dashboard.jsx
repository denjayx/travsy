import { Outlet } from 'react-router-dom'
import Sidebar from '../pages/Dashboard/Sidebar'

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  )
}

export default Dashboard
