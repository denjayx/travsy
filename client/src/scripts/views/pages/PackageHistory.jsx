import HistoryList from "../components/History/HistoryList";

export default function PackageHistory() {
  return (
    <div className="container mt-32 flex flex-col gap-5">
      <h1 className="mb-8 text-2xl font-bold text-primary-950">
        Riwayat Pesanan Kamu
      </h1>
      <HistoryList />
      <HistoryList />
      <HistoryList />
      <HistoryList />
    </div>
  )
}
