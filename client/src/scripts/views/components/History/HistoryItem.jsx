/* eslint-disable react/prop-types */
import UserImg from '../../../../assets/default-user.svg'
import { formatDate } from '../../../../utils/utils'
import Button from '../Buttons/Button'
import { Link } from 'react-router-dom'

const HistoryItem = ({
  tourGuideData,
  transactionData,
  packageData,
  historyId,
}) => {
  return (
    <section className="text-primary-950">
      <div className="flex flex-col gap-6 rounded-xl bg-white p-8 lg:flex-row">
        <div className="flex w-full flex-col">
          <h5 className="mb-2 text-lg font-semibold tracking-tight text-primary-950">
            {`${packageData.packageName}`}
          </h5>
          <div className="flex items-center gap-3">
            <img
              src={UserImg}
              width="32px"
              alt="tourguide avatar"
              className="avatar"
            />
            <span>{`${tourGuideData.firstName} ${tourGuideData.firstName}`}</span>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs">Tanggal Pesan :</span>
                <p className="text-md font-medium text-primary-950">
                  {formatDate(transactionData.orderDate)}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs">Status Pesanan :</span>
                <div
                  className={`flex h-3/4 items-center rounded-full bg-green-200 px-4 text-green-600 ${
                    (transactionData.status === 'menunggu' &&
                      'bg-orange-100 text-orange-600') ||
                    (transactionData.status === 'batal' &&
                      'bg-red-600 text-red-200')
                  }`}
                >
                  <p className="text-base">{transactionData.status}</p>
                </div>
              </div>
            </div>
            <Link to={`/history/${historyId}`}>
              <Button
                type="button"
                variant="secondary"
                className="h-fit shadow-none"
              >
                Lihat Detail
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HistoryItem
