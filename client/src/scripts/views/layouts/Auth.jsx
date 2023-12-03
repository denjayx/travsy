import { Outlet } from 'react-router-dom'
import Logo from '../../../assets/logo.svg'

const Auth = () => {
  return (
    <section className=" max-xl:mt-24 container flex h-screen items-center justify-center text-primary-950">
      <div className="lg:w-6/12 md:w-8/12  items-center justify-center space-y-4 rounded-3xl bg-white p-12">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <Outlet />
      </div>
    </section>
  )
}

export default Auth
