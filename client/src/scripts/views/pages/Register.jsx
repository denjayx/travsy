import { useState } from 'react'
import { IoIosAlert } from 'react-icons/io'
import InputField from '../components/Input/InputField'
import { register } from '../../data/api'
import Button from '../components/Buttons/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import InputSelect from '../components/Input/InputSelect'

const Register = () => {
  const { state } = useLocation()
  const [postData, setPostData] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
      const response = await register({
        user: { username: formData.username },
        account: {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
      })
      setPostData(response)
      navigate('/login')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

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
          options={[
            {
              label: state.role === 'tourist' ? 'Tourist' : 'Tour Guide',
              value: state.role === 'tourist' ? 'tourist' : 'tour guide',
            },
            {
              label: state.role !== 'tourist' ? 'Tourist' : 'Tour Guide',
              value: state.role !== 'tourist' ? 'tourist' : 'tour guide',
            },
          ]}
          onSelect={handleRoleChange}
          value={formData.role}
        />
        {errorMessage && (
          <div
            className="mb-4 rounded-lg bg-red-50 p-4 text-red-800"
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
        <Button type="submit" variant="primary" className="mt-4">
          Buat Akun
        </Button>
      </form>
      <label className="block text-center text-base text-primary-950 ">
        Sudah punya akun?{' '}
        <span className="font-semibold  text-primary-700 underline underline-offset-2">
          <Link to={'/login'}>Masuk</Link>
        </span>
      </label>
    </section>
  )
}

export default Register
