import { useState, useEffect } from 'react'
import CardImage from '../../../../assets/images/card-image.png'

export default function DestinationDetails() {
  const [openAccordion1, setOpenAccordion1] = useState(true)
  const [openAccordion2, setOpenAccordion2] = useState(true)
  const [openAccordion3, setOpenAccordion3] = useState(true)

  useEffect(() => {
    // Menetapkan state agar hanya accordion pertama yang terbuka saat halaman direfresh
    setOpenAccordion1(false)
  }, []) // Efek ini hanya akan dijalankan sekali setelah render pertama

  return (
    <div className="flex flex-col gap-6 py-7">
      <div className="py-2">
        <button
          onClick={() => setOpenAccordion1(!openAccordion1)}
          className=" flex w-full items-center justify-between rounded-2xl bg-white p-5 text-lg font-semibold  text-primary-900 border-2 border-primary-200"
        >
          <span>Pura Tanah Lot</span>
          {openAccordion1 ? (
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
          className={`oveflow-hidden mt-4 flex flex-col gap-6 rounded-xl bg-white p-5 ${
            openAccordion1 ? 'hidden' : 'block'
          }`}
        >
          <div className="flex flex-col gap-5 md:flex-row ">
            <img
              src={CardImage}
              alt="Thumbnail Card"
              className=" h-full w-full rounded-lg object-cover md:w-6/12 "
            />
            <img
              src={CardImage}
              alt="Thumbnail Card"
              className=" h-full w-full rounded-lg object-cover md:w-6/12"
            />
          </div>
          <div className=" flex w-fit items-center gap-1 rounded-3xl bg-primary-50 px-3 py-2">
            <svg
              className="h-[16px] w-[16px] text-primary-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            <span className="text-base text-primary-800">Bali</span>
          </div>
          <div className="text-primary-950 ">
            Lorem ipsum dolor sit amet consectetur. Convallis montes nulla cras
            in. Ut viverra odio et pharetra dictum nunc ultrices. Mattis lorem
            amet egestas blandit ut. Sed hendrerit convallis scelerisque arcu
            pulvinar id at.
          </div>
        </div>
      </div>

      <div className="py-2">
        <button
          onClick={() => setOpenAccordion2(!openAccordion2)}
          className=" flex w-full items-center justify-between rounded-2xl bg-white p-5 text-lg font-semibold  text-primary-900 border-2 border-primary-200"
        >
          <span>Pura Uluwatu</span>
          {openAccordion2 ? (
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
          className={`oveflow-hidden mt-4 flex flex-col gap-6 rounded-xl bg-white p-5 ${
            openAccordion2 ? 'hidden' : 'block'
          }`}
        >
          <div className="flex flex-col gap-5 md:flex-row ">
            <img
              src={CardImage}
              alt="Thumbnail Card"
              className=" h-full w-full rounded-lg object-cover md:w-6/12 "
            />
            <img
              src={CardImage}
              alt="Thumbnail Card"
              className=" h-full w-full rounded-lg object-cover md:w-6/12"
            />
          </div>
          <div className=" flex w-fit items-center gap-1 rounded-3xl bg-primary-50 px-3 py-2">
            <svg
              className="h-[16px] w-[16px] text-primary-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            <span className="text-base text-primary-800">Bali</span>
          </div>
          <div className="text-primary-950 ">
            Lorem ipsum dolor sit amet consectetur. Convallis montes nulla cras
            in. Ut viverra odio et pharetra dictum nunc ultrices. Mattis lorem
            amet egestas blandit ut. Sed hendrerit convallis scelerisque arcu
            pulvinar id at.
          </div>
        </div>
      </div>

      <div className="py-2">
        <button
          onClick={() => setOpenAccordion3(!openAccordion3)}
          className=" flex w-full items-center justify-between rounded-2xl bg-white p-5 text-lg font-semibold  text-primary-900 border-2 border-primary-200"
        >
          <span>Pantai Kuta</span>
          {openAccordion3 ? (
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
          className={`oveflow-hidden mt-4 flex flex-col gap-6 rounded-xl bg-white p-5 ${
            openAccordion3 ? 'hidden' : 'block'
          }`}
        >
          <div className="flex flex-col gap-5 md:flex-row ">
            <img
              src={CardImage}
              alt="Thumbnail Card"
              className=" h-full w-full rounded-lg object-cover md:w-6/12 "
            />
            <img
              src={CardImage}
              alt="Thumbnail Card"
              className=" h-full w-full rounded-lg object-cover md:w-6/12"
            />
          </div>
          <div className=" flex w-fit items-center gap-1 rounded-3xl bg-primary-50 px-3 py-2">
            <svg
              className="h-[16px] w-[16px] text-primary-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            <span className="text-base text-primary-800">Bali</span>
          </div>
          <div className="text-primary-950 ">
            Lorem ipsum dolor sit amet consectetur. Convallis montes nulla cras
            in. Ut viverra odio et pharetra dictum nunc ultrices. Mattis lorem
            amet egestas blandit ut. Sed hendrerit convallis scelerisque arcu
            pulvinar id at.
          </div>
        </div>
      </div>
    </div>
  )
}
