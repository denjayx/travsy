import { Outlet, useOutletContext } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default function RootLayout() {
  const { user } = useOutletContext()
  return (
    <>
      <header>
        <Navbar user={user} />
      </header>

      <main className="min-h-screen">
        <Outlet context={{ user }} />
      </main>

      <footer className="mt-auto w-full bg-primary-500">
        <Footer />
      </footer>
    </>
  )
}
