import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
      <div className="mt-32 p-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  )
}

export default Dashboard
