import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { login } from '../../data/api'
import InputField from '../components/Input/InputField'
import { IoIosAlert } from 'react-icons/io'

export default function Login() {
  const { setUser } = useOutletContext()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await login({
        email: formData.email,
        password: formData.password,
      })
      if (user) {
        localStorage.setItem('token', user.token)
        setUser(user)
        navigate('/')
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-md font-bold text-primary-950">
        Masuk ke akun Travsy Anda.
      </h3>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="email"
          label="Email"
          value={formData.email}
          placeholder="cth: emailkamu@gmail.com"
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="password"
          label="Kata Sandi"
          value={formData.password}
          placeholder="************"
          onChange={handleChange}
        />
        {errorMessage && (
          <div
            className="text-red-800 bg-red-50 mt-4 rounded-lg p-4"
            role="alert"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <IoIosAlert size={18} className="mr-2" />
                <span className="font-medium">Ups! Ada yang salah</span>
              </div>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}
        <button
          type="submit"
          className="focus:ring-blue-300 container my-4 rounded-3xl bg-primary-500 px-6 py-3
          text-center text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4"
        >
          Masuk
        </button>
        <label className="mt-3 block text-center text-base text-primary-950 ">
          Belum punya akun?{' '}
          <span className="font-semibold  text-primary-700 underline underline-offset-2">
            <Link to={'/register'} state={{ role: 'tourist' }}>
              Buat Akun
            </Link>
          </span>
        </label>
      </form>
    </section>
  )
}
