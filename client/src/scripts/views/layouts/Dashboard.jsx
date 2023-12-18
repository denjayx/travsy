import {
  NavLink,
  Outlet,
  useNavigate,
  useOutletContext,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import tourIcon from '../../../assets/tour-icon.svg'
import orderIcon from '../../../assets/transaction-order.svg'

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
    <div className="mt-32">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-primary-500 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:text-primary-400 dark:hover:bg-primary-700 dark:focus:ring-primary-600 sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <div className="flex flex-row">
        <aside
          id="default-sidebar"
          className="relative left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full overflow-y-auto  rounded-r-lg bg-primary-500 px-3 py-4">
            <ul className="space-y-2 font-medium">
              <li>
                <NavLink
                  to={'packages'}
                  className="group flex items-center rounded-lg p-2 text-primary-900 hover:bg-primary-100 dark:text-white dark:hover:bg-primary-700"
                >
                  <img src={tourIcon} alt="tour icon" />
                  <span className="ms-3">Paket Wisata</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'orders'}
                  className="group flex items-center rounded-lg p-2 text-primary-900 hover:bg-primary-100 dark:text-white dark:hover:bg-primary-700"
                >
                  <img src={orderIcon} alt="order icon" />
                  <span className="ms-3 flex-1 whitespace-nowrap">Pesanan</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>
        <Outlet context={useOutletContext()} />
      </div>
    </div>
  )
}

export default Dashboard
