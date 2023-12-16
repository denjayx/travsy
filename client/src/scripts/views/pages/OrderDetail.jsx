import PackageDetails from '../components/Details/PackageDetails'

export default function OrderDetails() {
  return (
    <section className="container mt-32 ">
      <h1 className="mb-8 text-2xl font-bold text-primary-950">
        <span className="text-primary-600">Yuk!</span> Cek Lagi Pesanan Kamu.
      </h1>
      <PackageDetails showImage={false} />
    </section>
  )
}
