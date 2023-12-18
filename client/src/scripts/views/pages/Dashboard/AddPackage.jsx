/* eslint-disable no-prototype-builtins */
import { useState } from 'react'
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom'
import uploadImgIcon from '../../../../assets/upload-img.svg'
import InputField from '../../components/Input/InputField'
import DestinationInput from '../../components/Details/DestinationInput'
import InputImage from '../../components/Input/InputImage'
import Button from '../../components/Buttons/Button'
import { createPackage } from '../../../data/api'
import ErrorAlert from '../../components/Alerts/ErrorAlert'

const AddPackage = () => {
  const [packageData, setPackageData] = useState({
    packageName: '',
    thumbnail: '',
    price: 0,
    description: '',
    serviceDuration: 0,
    destinations: [],
  })
  const { user } = useOutletContext()
  const [destinationCount, setDestinationCount] = useState(0)
  const [destinationComponents, setDestinationComponents] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setPackageData({
      ...packageData,
      [name]: ['price', 'serviceDuration'].includes(name)
        ? parseInt(value, 10)
        : value,
    })
  }

  const handleImageChange = (event) => {
    const { name, files } = event.target
    setPackageData({ ...packageData, [name]: files[0] })
  }

  const addDestination = () => {
    setPackageData({
      ...packageData,
      destinations: [...packageData.destinations, {}],
    })

    const newDestinationComponent = (
      <DestinationInput
        key={destinationCount}
        id={destinationCount}
        packageData={packageData}
        setPackageData={setPackageData}
      />
    )

    setDestinationCount(() => destinationCount + 1)

    setDestinationComponents([
      ...destinationComponents,
      newDestinationComponent,
    ])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { token } = user
    const formData = new FormData()

    for (let key in packageData) {
      if (packageData.hasOwnProperty(key)) {
        if (key === 'destinations') {
          packageData[key].forEach((destination, index) => {
            Object.keys(destination).forEach((destinationKey) => {
              formData.append(
                `${key}[${index}][${destinationKey}]`,
                destination[destinationKey],
              )
            })
          })
        } else {
          formData.append(key, packageData[key])
        }
      }
    }

    if (token) {
      try {
        await createPackage(token, formData)
        navigate('/dashboard')
      } catch (error) {
        setErrorMessage(error.response.data.message)
      }
    }
  }

  return (
    <>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-2">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="me-2.5 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <NavLink to="/dashboard/packages/">
                <a className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ms-2">
                  Dashboard
                </a>
              </NavLink>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                Tambah Package
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* form detail */}
      <div className="mt-8">
        <form
          className="colum mb-4 flex flex-col gap-3 rounded bg-white px-8 pb-8 pt-6 shadow-md"
          onSubmit={handleSubmit}
        >
          <InputField
            type="text"
            name="packageName"
            label="Nama Paket"
            value={packageData.packageName}
            placeholder="masukkan nama paket"
            onChange={handleInputChange}
          />
          <InputField
            type="number"
            name="price"
            label="Harga Paket"
            value={packageData.price}
            placeholder="Rp."
            onChange={handleInputChange}
          />
          <InputField
            type="textArea"
            name="description"
            label="Deskripsi Paket"
            value={packageData.description}
            placeholder="masukkan deskripsi paket"
            onChange={handleInputChange}
          />
          <InputField
            type="number"
            showCounter
            name="serviceDuration"
            label="Durasi Layanan"
            value={packageData.serviceDuration}
            placeholder="0 hari"
            onChange={handleInputChange}
          />
          <InputImage
            label={'Gambar Thumbnail'}
            name={'thumbnail'}
            onChange={handleImageChange}
            placeholderImage={uploadImgIcon}
            placeholderWords={'Upload Thumbnail'}
          />
          {destinationComponents.map((component) => component)}
          <Button
            variant={'text'}
            className={`self-end`}
            type="button"
            onClick={addDestination}
          >
            Tambah Destination
          </Button>
          {errorMessage && <ErrorAlert message={errorMessage} />}
          <div className="flex justify-between">
            <NavLink to="/dashboard/packages">
              <Button variant={'secondary'}>Batalkan</Button>
            </NavLink>
            <Button variant={'primary'}>Simpan</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddPackage
