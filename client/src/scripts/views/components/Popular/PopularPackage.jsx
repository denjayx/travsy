/* eslint-disable react/prop-types */
import Card from '../Cards/Card'
import Paragraph from '../Paragraph/Paragraph'

const PopularPackage = ({ className }) => {
  return (
    <section
      id="popular"
      className={`container flex flex-col gap-8 ${className}`}
    >
      <div id="popularText" className="flex flex-col gap-4 lg:w-6/12">
        <h3 className="text-xl font-bold text-primary-950">Paket Terpopuler</h3>
        <Paragraph>
          Kami menyajikan beberapa paket wisata menarik yang sering dikunjungi
          oleh wisatawan lokal maupun mancanegara.
        </Paragraph>
      </div>
      <section className="flex gap-8 overflow-x-scroll">
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </section>
  )
}

export default PopularPackage
