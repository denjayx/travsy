import { useState, useEffect } from 'react'
import InputSelect from '../Input/InputSelect'
import InputField from '../Input/InputField'

export default function DestinationInput({ key, packageData, setPackageData }) {
  const [openAccordion, setOpenAccordion] = useState(true)
  const [destinationData, setDestinationData] = useState({
    destinationName: '',
    city: '',
    description: '',
  })

  const options = [
    {
      value: 'badung',
      label: 'Badung',
    },
    {
      value: 'bangli',
      label: 'Bangli',
    },
    {
      value: 'buleleng',
      label: 'Buleleng',
    },
    {
      value: '',
      label: 'Gianyar',
    },
    {
      value: '',
      label: 'Jembrana',
    },
    {
      value: 'karangasem',
      label: 'Karangasem',
    },
    {
      value: 'klungkung',
      label: 'Klungkung',
    },
    {
      value: 'tabanan',
      label: 'Tabanan',
    },
    {
      value: 'denpasar',
      label: 'Denpasar',
    },
  ]

  useEffect(() => {
    setOpenAccordion(false)
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDestinationData({ ...destinationData, [name]: value })
  }

  const handleSelectChange = (name, value) => {
    setDestinationData({ ...destinationData, [name]: value })
  }

  useEffect(() => {
    setPackageData({
      ...packageData,
      destinations: packageData.destinations.map((destination, index) => {
        if (key === index) {
          return destinationData
        }
        return destination
      }),
    })
  }, [destinationData])

  return (
    <div className="flex flex-col gap-6 py-7">
      <div className="py-2">
        <button
          onClick={() => setOpenAccordion(!openAccordion)}
          className=" flex w-full items-center justify-between rounded-2xl border-2 border-primary-200 bg-white p-5  text-lg font-semibold text-primary-900"
          type="button"
        >
          <span>{destinationData.destinationName}</span>
          {openAccordion ? (
            <svg
              className="h-[16px] w-[16px] text-primary-900 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 8"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
              />
            </svg>
          ) : (
            <svg
              className="h-[16px] w-[16px] text-primary-900 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 8"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
              />
            </svg>
          )}
        </button>
        <div
          className={`oveflow-hidden flex flex-col gap-6 rounded-xl bg-white p-5 ${
            openAccordion ? 'hidden' : 'block'
          }`}
        >
          <InputField
            type="text"
            name="destinationName"
            label="Nama Destinasi Wisata"
            value={destinationData.destinationName}
            placeholder="Masukkan nama destinasi wisata"
            onChange={handleInputChange}
          />
          <InputSelect
            label={'Kota'}
            options={options}
            onSelect={handleSelectChange}
            name={'city'}
          />
          <InputField
            type="textArea"
            name="description"
            label="Deskripsi Destinasi Wisata"
            value={destinationData.description}
            placeholder="masukkan deskripsi destinasi wisata"
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  )
}
