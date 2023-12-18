import { useEffect, useState } from 'react'
import HistoryItem from '../components/History/HistoryItem'
import { getTransactionHistory } from '../../data/api'
import { useOutletContext } from 'react-router-dom'

export default function PackageHistory() {
  const [histories, setHistories] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const { user } = useOutletContext()
  useEffect(() => {
    try {
      const fetchHistory = async (token) => {
        const results = await getTransactionHistory(token)
        setHistories(results)
      }
      if (user?.token) {
        fetchHistory(user.token)
      }
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }, [user])
  return (
    <div className="container mt-32 flex flex-col gap-5">
      <h1 className="mb-8 text-2xl font-bold text-primary-950">
        Riwayat Pesanan Kamu
      </h1>
      {histories.length === 0 && <span>Data kosong</span>}
      <div className="grid grid-cols-2 gap-6">
        {histories.map((history, index) => (
          <HistoryItem
            key={index}
            tourGuideData={history.tourGuide}
            transactionData={history.transaction}
            packageData={history.transaction.package}
            historyId={history.transaction.id}
          />
        ))}
      </div>
    </div>
  )
}
