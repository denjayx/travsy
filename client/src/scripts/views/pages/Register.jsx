import { useState } from 'react'
import InputField from '../components/Input/InputField'
import { register } from '../../data/api'
import Button from '../components/Buttons/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import InputSelect from '../components/Input/InputSelect'

const Register = () => {
  const { state } = useLocation()
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'tourist',
  })

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleRoleChange = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('Form Data:', {
        user: { username: formData.username },
        account: {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
      })
      const postData = await register({
        user: { username: formData.username },
        account: {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
      })
      console.log('User successfully registered:', postData)
    } catch (error) {
      console.error('Error registering user:', error)
    }

    navigate('/login')
  }

  const roleOptions = [
    {
      label: state?.role === 'tourist' ? 'Tourist' : 'Tour Guide',
      value: state?.role === 'tourist' ? 'tourist' : 'tour guide',
    },
    {
      label: state?.role !== 'tourist' ? 'Tourist' : 'Tour Guide',
      value: state?.role !== 'tourist' ? 'tourist' : 'tour guide',
    },
  ]
  return (
    <section className="flex flex-col gap-3 ">
      <h3 className="text-md font-bold text-primary-950">
       Buat akun Travsy Anda.
      </h3>
      <form className="flex flex-col gap-3">
        <InputEmail
          id="email"
          label="email"
          condition="default"
          placeholder="emailkamu@mail.com"
        >
          Email
        </InputEmail>
        <InputText
          condition="default"
          label="username"
          id="username"
          placeholder="Buat Nama Pengguna"
        >
          Nama Pengguna
        </InputText>
        <InputPassword
          condition="default"
          label="password"
          id="password"
          placeholder="Masukkan Kata Sandi"
        >
          Kata Sandi
        </InputPassword>
        <InputPassword
          condition="default"
          label="confirm-password"
          id="confirm-password"
          placeholder="Konfirmasi Kata Sandi"
        >
          Konfirmasi Kata Sandi
        </InputPassword>

        <button
          type="submit"
          className="focus:ring-blue-300 container my-4 rounded-3xl bg-primary-500 px-6 py-3
          text-center text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4"
        >
          Buat Akun
        </button>

        <label className="mt-3 block text-center text-base text-primary-950 ">
          Daftar jadi Tour Guide {' '}
          <span className="font-semibold  text-primary-700 underline underline-offset-2">
            <a href="#">disini</a>
          </span>
        </label>
      </form>
      <label className="block text-center text-base text-primary-950 ">
        Masuk ke akun{' '}
        <span className="font-semibold  text-primary-700 underline underline-offset-2">
          <Link to={'/login'}>disini</Link>
        </span>
      </label>
    </section>
  )
}

export default Register
