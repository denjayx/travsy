/* eslint-disable react/prop-types */
import { useState } from 'react'
import BookingFields from '../components/BookingFields/BookingFields'
import SideBarFilter from '../components/BookingFields/SideBarFilter'
import PopularPackage from '../components/Popular/PopularPackage'
import Card from '../components/Cards/Card'

export default function TourPackage() {
  const [packageList, setPackageList] = useState([])

  return (
    <section className="mt-32">
      <BookingFields setPackageList={setPackageList} />
      <div className="container mt-16 flex gap-4 max-xl:flex-col-reverse max-xl:gap-14">
        {packageList.length === 0 ? (
          <>
            <PopularPackage />
            <SideBarFilter
              setPackageList={setPackageList}
              packageList={packageList}
              className="xl:w-3/12"
            />
          </>
        ) : (
          <section className="flex w-full flex-col gap-8">
            <h4 className="text-xl font-bold text-primary-950">
              Hasil Pencarian Kamu
            </h4>
            <div className="flex gap-4 max-xl:flex-col-reverse max-xl:gap-14">
              <div className="flex gap-4 overflow-x-scroll lg:grid lg:grid-cols-3">
                {packageList.map((packageData) => (
                  <Card
                    key={packageData.package.id}
                    packagesData={packageData.package}
                    tourguideData={packageData.tourGuide}
                    cardId={packageData.package.id}
                  />
                ))}
              </div>
              <SideBarFilter
                setPackageList={setPackageList}
                packageList={packageList}
                className="xl:w-3/12"
              />
            </div>
          </section>
        )}
      </div>
    </section>
  )
}
