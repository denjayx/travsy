import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom'
import RootLayout from '../views/layouts/RootLayout'
import TourPackage from '../views/pages/TourPackage'
import PackageHistory from '../views/pages/PackageHistory'
import HistoryDetails from '../views/pages/HistoryDetails'
import Login from '../views/pages/Login'
import Register from '../views/pages/Register'
import Homepage from '../views/pages/Homepage'
import Auth from '../views/layouts/Auth'
import Detail from '../views/pages/Detail'
import Root from '../views/layouts/Root'
import OrderDetails from '../views/pages/OrderDetail'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Root />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="/package" element={<TourPackage />}></Route>
          <Route path="/history" element={<PackageHistory />}></Route>
          <Route path="/history/detail" element={<HistoryDetails />}></Route>
          <Route path="/packages/:id" element={<Detail />}></Route>
          <Route path="/order" element={<OrderDetails />}></Route>
        </Route>
        <Route element={<Auth />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
      </Route>
    </>,
  ),
)

export default router
