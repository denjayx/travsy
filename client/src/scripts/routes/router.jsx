import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom'
import RootLayout from '../views/layouts/RootLayout'
import TourPackage from '../views/pages/TourPackage'
import PackageHistory from '../views/pages/PackageHistory'
import Login from '../views/pages/Login'
import Register from '../views/pages/Register'
import Homepage from '../views/pages/Homepage'
import Auth from '../views/layouts/Auth'
import Detail from '../views/pages/Detail'
import Dashboard from '../views/layouts/Dashboard'
import Packages from '../views/pages/Dashboard/Packages'
import Orders from '../views/pages/Dashboard/Orders'
import PackagesDetail from '../views/pages/Dashboard/PackagesDetail'
import AddPackage from '../views/pages/Dashboard/AddPackage'
import AddOrder from '../views/pages/Dashboard/AddOrder'
import DetailOrder from '../views/pages/Dashboard/DetailOrder'
import Root from '../views/layouts/Root'
import Profile from '../views/pages/Dashboard/Profile'
import UpdateProfile from '../views/pages/Dashboard/UpdateProfile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Root />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="packages" element={<TourPackage />}></Route>
          <Route path="packages/:id" element={<Detail />}></Route>
          <Route path="history" element={<PackageHistory />}></Route>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to={'packages'} />} />
            <Route path="packages" element={<Packages />}></Route>
            <Route path="packages/add" element={<AddPackage />}></Route>
            <Route path="packages/:id" element={<PackagesDetail />}></Route>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="orders/add" element={<AddOrder />}></Route>
            <Route path="orders/:id" element={<DetailOrder />}></Route>
          </Route>
        </Route>
        <Route element={<Auth />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
      </Route>
      <Route element={<Dashboard />}>
        {/* <Route path="/detail-packages" element={<DetailPackages />}></Route>
        <Route path="/add-packages" element={<AddPackages />}></Route>
        <Route path="/bookings" element={<Bookings />}></Route>
        <Route path="/confirmation" element={<Confirmation />}></Route> */}
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/update-profile" element={<UpdateProfile />}></Route>
      </Route>
    </>,
  ),
)

export default router
