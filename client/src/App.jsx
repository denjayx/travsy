import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './scripts/views/pages/Home'
import TourPackage from './scripts/views/pages/TourPackage'
import PackageHistory from './scripts/views/pages/PackageHistory'
import RootLayout from './scripts/views/layouts/RootLayout'
import Login from './scripts/views/pages/Login'
import Register from './scripts/views/pages/Register'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />}></Route>
      <Route path='/package' element={<TourPackage />}></Route>
      <Route path='/history' element={<PackageHistory />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
