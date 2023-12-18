import { useEffect, useState } from 'react'
import UserImg from '../../../assets/default-user.svg'
import Button from '../components/Buttons/Button'
import InputField from '../components/Input/InputField'
import InputSelect from '../components/Input/InputSelect'
import InputImage from '../components/Input/InputImage'
import { getProfile, updateProfile } from '../../data/api'
import { useOutletContext } from 'react-router-dom'
import ErrorAlert from '../components/Alerts/ErrorAlert'

const Profile = () => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const { user } = useOutletContext()
  const [profileData, setProfileData] = useState({
    email: '',
    avatar: '',
    firstName: '',
    lastName: '',
    biography: '',
    nik: 0,
    phone: '',
    gender: 'L',
  })

  useEffect(() => {
    const fetchProfileData = async (token) => {
      const response = await getProfile(token)
      setProfileData(response)
    }
    if (user?.token) {
      fetchProfileData(user.token)
    }
  }, [user])

  useEffect(() => {
    console.log(profileData)
  }, [profileData])

  const genderOptions = [
    { label: 'Laki - laki', value: 'L' },
    { label: 'Perempuan', value: 'P' },
  ]

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setProfileData({ ...profileData, [name]: value })
  }

  const handleSelectChange = (name, value) => {
    setProfileData({ ...profileData, [name]: value })
  }

  const handleImageChange = (event) => {
    const { name, files } = event.target
    setProfileData({ ...profileData, [name]: files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { token } = user
    const formData = new FormData()

    const filteredProfileData = profileData
    delete filteredProfileData['avatarUrl']

    for (let key in filteredProfileData) {
      formData.append(key, filteredProfileData[key])
    }
    if (token) {
      try {
        await updateProfile(token, formData)
      } catch (error) {
        setErrorMessage(error.response.data.message)
      }
    }
  }

  return (
    <section className="container mt-32 flex flex-col gap-8 rounded-2xl bg-white py-12 text-primary-950">
      <h3 className="text-2xl font-bold">Profil</h3>
      <div className="flex w-fit items-center gap-4 rounded-2xl">
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <img
            className="h-full w-full scale-125 object-cover"
            src={UserImg}
            alt="default user image"
          />
        </div>
        <h5 className="text-xl">denjayx</h5>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            name="firstName"
            label="Nama Depan"
            type="text"
            placeholder="Masukkan nama depan"
            isDisabled={isDisabled}
            onChange={handleInputChange}
            value={profileData.firstName}
          />
          <InputField
            name="lastName"
            label="Nama Belakang"
            type="text"
            placeholder="Masukkan nama belakang"
            isDisabled={isDisabled}
            onChange={handleInputChange}
            value={profileData.lastName}
          />
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="Masukkan email"
            isDisabled={isDisabled}
            onChange={handleInputChange}
            value={profileData.email}
          />
          <InputField
            name="phone"
            label="No. Telepon"
            type="text"
            placeholder="+62xxxx"
            isDisabled={isDisabled}
            onChange={handleInputChange}
            value={profileData.phone}
          />
          <InputField
            name="nik"
            label="No. KTP"
            type="number"
            placeholder="Masukkan 16 Digit Nomor Induk KTP"
            isDisabled={isDisabled}
            onChange={handleInputChange}
            value={profileData.nik}
          />
          <InputSelect
            label="Jenis Kelamin"
            name="gender"
            options={genderOptions}
            isDisabled={isDisabled}
            onSelect={handleSelectChange}
            value={profileData.gender}
          />
          <InputField
            name="biography"
            label="Deskripsi diri"
            type="textArea"
            placeholder="Deskripsi diri / Bio"
            isDisabled={isDisabled}
            onChange={handleInputChange}
            value={profileData.biography}
          />
          <InputImage
            label={'Foto profil'}
            name={'avatar'}
            onChange={handleImageChange}
            placeholderImage={UserImg}
            placeholderWords={'Upload Foto'}
            isDisabled={isDisabled}
            value={profileData.avatarUrl}
          />
        </div>
        {errorMessage && !isDisabled && <ErrorAlert message={errorMessage} />}
        <div className="flex w-full justify-end">
          {isDisabled ? (
            <div
              className="cursor-pointer rounded-full border border-primary-500 bg-primary-500 px-6 py-3 text-white shadow-btn duration-300 ease-in-out hover:bg-primary-600"
              onClick={() => setIsDisabled(!isDisabled)}
            >
              Edit Profil
            </div>
          ) : (
            <div className="flex gap-2">
              <div
                className="cursor-pointer rounded-full border border-primary-500 bg-white px-6 py-3 text-primary-500 shadow-btn duration-300 ease-in-out hover:bg-primary-100"
                onClick={() => setIsDisabled(!isDisabled)}
              >
                Batal
              </div>
              <Button
                variant="primary"
                className="w-fit cursor-pointer"
                type="submit"
              >
                Simpan
              </Button>
            </div>
          )}
        </div>
      </form>
    </section>
  )
}

export default Profile
