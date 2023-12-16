/* eslint-disable react/prop-types */
import Button from '../Buttons/Button'
import InputField from '../Input/InputField'
import InputSelect from '../Input/InputSelect'
import Paragraph from '../Paragraph/Paragraph'

const SideBarFilter = ({ className, packageList }) => {
  return (
    <section className={`${className} flex flex-col gap-8`}>
      {packageList.length === 0 && (
        <div id="popularText" className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-primary-950">Filter</h3>
          <Paragraph>Sesuaikan liburanmu dengan kebutuhan kamu</Paragraph>
        </div>
      )}
      <div className="flex h-fit flex-col gap-4 rounded-2xl bg-white p-6 text-primary-950">
        <InputSelect
          label="Kota"
          options={[
            { label: 'Badung', value: 'badung' },
            { label: 'Kuta', value: 'kuta' },
          ]}
        />
        <InputField label="Jumlah destinasi" type="number" placeholder="0" />
        <InputField label="Harga Minimal" type="number" placeholder="Rp. " />
        <InputField label="Harga Maksimal" type="number" placeholder="Rp. " />
        <Button variant="secondary" className="shadow-none">
          Terapkan
        </Button>
      </div>
    </section>
  )
}

export default SideBarFilter
