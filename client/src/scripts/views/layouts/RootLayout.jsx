import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

export default function RootLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}
