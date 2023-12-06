import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default function RootLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="min-h-screen">
        <Outlet />
      </main>

      <footer className="mt-auto w-full bg-primary-500">
        <Footer />
      </footer>
    </>
  )
}
