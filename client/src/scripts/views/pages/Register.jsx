import { useState } from 'react'
import InputField from '../components/Input/InputField'
import { register } from '../../data/api'
import RadioButton from '../components/Input/CheckBox'
import Button from '../components/Buttons/Button'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'tourist',
  })

  console.log(formData)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
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
  }

  return (
    <section className="flex flex-col gap-3 ">
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
        <InputField
          label="role"
          placeholder="Masukkan Role"
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
        <Button type="button">
          <RadioButton
            id="tourguide"
            label="Tourguide"
            name="role"
            value="tour guide"
            onChange={handleChange}
            checked={formData.role === 'tour guide'}
          />
        </Button>
        <button
          type="submit"
          className="focus:ring-blue-300 my-4 rounded-3xl bg-primary-500 px-6 py-3
          text-center text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4"
        >
          Buat Akun
        </button>

        <label className="mt-3 block text-center text-base text-primary-950 ">
          Daftar jadi Tour Guide{' '}
          <span className="font-semibold  text-primary-700 underline underline-offset-2">
            <a href="#">disini</a>
          </span>
        </label>
      </form>
    </section>
  )
}

export default Register
