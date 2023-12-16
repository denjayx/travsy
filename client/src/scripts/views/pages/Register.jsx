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
    <section className="flex flex-col gap-6 ">
      <h3 className="text-md font-bold text-primary-950">
        Buat akun Travsy Anda.
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <InputField
          label="Email"
          placeholder="cth:emailkamu@gmail.com"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Username"
          placeholder="cth:namapengguna_"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <InputField
          label="Kata Sandi"
          placeholder="**********"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputSelect
          label="Saya ingin mendaftar sebagai"
          options={roleOptions}
          onSelect={handleRoleChange}
          value={formData.role}
        />

        <Button type="submit" variant="primary" className="mt-4">
          Buat Akun
        </Button>
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
