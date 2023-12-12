import InputPassword from '../components/Input/InputPassword'
import InputEmail from '../components/Input/InputEmail'
import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { login } from '../../data/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useOutletContext()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = await login({ email, password })
    if (user) {
      localStorage.setItem('token', user.token)
      setUser(user)
      navigate('/')
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-md font-bold text-primary-950">
        Masuk ke akun Travsy Anda.
      </h3>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <InputEmail
          id="email"
          label="email"
          condition="default"
          placeholder="Masukkan email yang terdaftar"
          setEmail={setEmail}
        >
          Email
        </InputEmail>
        <InputPassword
          condition="default"
          label="password"
          id="password"
          placeholder="Masukkan Kata Sandi"
          setPassword={setPassword}
        >
          Kata Sandi
        </InputPassword>

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
            <a href="/register">Buat Akun</a>
          </span>
        </label>
      </form>
    </section>
  )
}
