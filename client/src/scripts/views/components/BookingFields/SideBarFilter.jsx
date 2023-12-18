/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { getPackageList } from '../../../data/api'
import Button from '../Buttons/Button'
import InputField from '../Input/InputField'
import InputSelect from '../Input/InputSelect'
import Paragraph from '../Paragraph/Paragraph'

const SideBarFilter = ({ className, packageList, setPackageList }) => {
  const [filterFormData, setFilterFormData] = useState({})

  useEffect(() => {
    console.log(filterFormData)
  }, [filterFormData])
  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFilterFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSelect = (name, value) => {
    setFilterFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleFilterSubmit = async (e) => {
    e.preventDefault()
    const response = await getPackageList(filterFormData)
    setPackageList(response)
  }

  const cityOptions = [
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
      value: 'gianyar',
      label: 'Gianyar',
    },
    {
      value: 'jembrana',
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

  return (
    <section className={`${className} flex flex-col gap-8`}>
      {packageList.length === 0 && (
        <div id="popularText" className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-primary-950">Filter</h3>
          <Paragraph>Sesuaikan liburanmu dengan kebutuhan kamu</Paragraph>
        </div>
      )}
      <form
        onSubmit={handleFilterSubmit}
        className="flex h-fit flex-col gap-4 rounded-2xl bg-white p-6 text-primary-950"
      >
        <InputSelect
          label="Kota"
          name="city"
          options={cityOptions}
          onSelect={handleSelect}
        />
        <InputField
          label="Jumlah destinasi"
          name="ndest"
          type="number"
          placeholder="0"
          onChange={handleFormChange}
          showCounter
        />
        <InputField
          label="Harga Minimal"
          name="pmin"
          type="number"
          placeholder="Rp. "
          onChange={handleFormChange}
        />
        <InputField
          label="Harga Maksimal"
          name="pmax"
          type="number"
          placeholder="Rp. "
          onChange={handleFormChange}
        />
        <Button variant="secondary" className="shadow-none">
          Terapkan
        </Button>
      </form>
    </section>
  )
}

export default SideBarFilter
