import CardImage from '../../../../assets/images/card-image.png'
import OrderForm from '../Order/OrderForm'
import CardPackage from './CardPackage'

const PackageDetails = () => {
  return (
    <section
      id="packagedetails"
      className=" flex w-full flex-col items-center gap-6 rounded-xl lg:flex-row"
    >
      <div className="h-full w-full overflow-hidden rounded-lg md:rounded-l-lg lg:w-6/12">
        <img
          src={CardImage}
          alt="Thumbnail Card"
          className=" W-full h-full object-cover "
        />
      </div>
      <CardPackage />

      <div className="w-full lg:w-6/12 ">
        <OrderForm />
      </div>
    </section>
  )
}

export default PackageDetails
