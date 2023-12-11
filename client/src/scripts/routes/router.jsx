import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Homepage />}></Route>
        <Route path="/package" element={<TourPackage />}></Route>
        <Route path="/history" element={<PackageHistory />}></Route>
        <Route path="/packages/:id" element={<Detail />}></Route>
      </Route>
      <Route element={<Auth />}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Route>
      <Route element={<Dashboard />}>
        <Route path="/dashboard/packages" element={<Packages />}></Route>
        <Route path="/dashboard/packages/add" element={<AddPackage />}></Route>
        <Route
          path="/dashboard/packages/details"
          element={<PackagesDetail />}
        ></Route>
        <Route path="/dashboard/orders" element={<Orders />}></Route>
        <Route path="/dashboard/orders/add" element={<AddOrder />}></Route>
        <Route
          path="/dashboard/orders/details"
          element={<DetailOrder />}
        ></Route>
        {/* <Route path="/detail-packages" element={<DetailPackages />}></Route>
        <Route path="/add-packages" element={<AddPackages />}></Route>
        <Route path="/bookings" element={<Bookings />}></Route>
        <Route path="/confirmation" element={<Confirmation />}></Route> */}
      </Route>
    </>,
  ),
)

export default router
