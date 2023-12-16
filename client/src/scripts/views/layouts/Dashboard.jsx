import { Outlet, useOutletContext } from 'react-router-dom'
import Sidebar from '../pages/Dashboard/Sidebar'

const Dashboard = () => {
  return (
    <>
      <div className="mt-32 p-4 sm:ml-64">
        <Sidebar />
        <Outlet context={useOutletContext()} />
      </div>
    </>
  )
}

export default Dashboard
