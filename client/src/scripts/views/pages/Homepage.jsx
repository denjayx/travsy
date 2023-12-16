import Steps from '../components/Steps/Steps'
import Hero from '../components/Hero/Hero'
import PopularPackage from '../components/Popular/PopularPackage'
import Scale from '../components/Scale/Scale'
import WhyUs from '../components/WhyUs/WhyUs'
import Testimoni from '../components/Testimoni/Testimoni'

export default function Homepage() {
  return (
    <>
      <Hero />
      <PopularPackage className="mt-24" />
      <Scale />
      <WhyUs />
      <Steps />
      <Testimoni />
    </>
  )
}
