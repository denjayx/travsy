import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { useEffect } from 'react'

export default function RootLayout() {
  const { user } = useOutletContext()

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <header>
        <Navbar user={user} />
      </header>

      <main className="min-h-screen">
        <Outlet context={useOutletContext()} />
      </main>

      <footer className="mt-auto w-full bg-primary-500">
        <Footer />
      </footer>
    </>
  )
}
