import CardImage from '../../../../assets/images/card-image-full.png'
import Avatar from '../../../../assets/avatar.png'
import { useNavigate } from 'react-router-dom'

const HistoryList = () => {
    const navigate = useNavigate()
    const handleLihatDetail = () =>{
        navigate('/history/detail')
    }
  return (
    <section>
      <div className="flex flex-col gap-6 rounded-xl bg-white  p-4 lg:flex-row">
        <div className="w-full lg:w-5/12">
          <img
            src={CardImage}
            alt="Thumbnail Card"
            className=" h-full w-full rounded-lg object-cover"
          />
        </div>

        <div className="flex w-full flex-col gap-3">
          <h5 className="mb-2 text-lg font-semibold tracking-tight text-primary-950">
            Pura Tanah Lot - Pura Uluwatu - Pantai Kuta
          </h5>

          <div className="flex items-center gap-3">
            <img
              src={Avatar}
              width="32px"
              alt="tourguide avatar"
              className="avatar"
            />
            <span>Abram Saris</span>
          </div>

          <div className=" flex flex-row justify-start gap-1">
            <div className="rounded-full bg-primary-50 px-2 py-1.5 ">
              <p className="text-xs text-primary-800">Malioboro</p>
            </div>

            <div className="rounded-full  bg-primary-50 px-2 py-1.5 ">
              <p className="text-xs text-primary-800">Gembira Loka</p>
            </div>

            <div className="rounded-full bg-primary-50 px-2 py-1.5 ">
              <p className="text-xs text-primary-800">Prambanan</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3">
            <div className="rounded-lg border border-primary-300 bg-primary-50 px-4 py-2">
              <p className="text-base text-primary-950">2023-12-08</p>
            </div>
            <span className="text-sm"> Sampai</span>
            <div className="rounded-lg border border-primary-300 bg-primary-50 px-4 py-2">
              <p className="text-base text-primary-950">2023-15-08</p>
            </div>
          </div>
          <div className="flex flex-row flex-wrap justify-between ">
            <div className="h-3/4 rounded-full bg-primary-300 px-4 py-1">
              <p className="text-base">Selesai</p>
            </div>

            <div className="rounded-full bg-primary-500 px-6 py-3 ">
              <button className="text-white " onClick={handleLihatDetail}>
                Lihat Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HistoryList
