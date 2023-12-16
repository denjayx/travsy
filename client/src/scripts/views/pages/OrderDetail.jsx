import CardPackage from '../components/Details/CardPackage'
import OrderData from '../components/Order/OrderData'

export default function OrderDetails() {
  return (
    <section className="container mt-32 ">
      <h1 className="mb-8 text-2xl font-bold text-primary-950">
        <span className="text-primary-600">Yuk!</span> Cek Lagi Pesanan Kamu.
      </h1>
      <div className="flex flex-col gap-4 lg:flex-row ">
        <CardPackage />

        <OrderData />
      </div>
    </section>
  )
}
