import moment from "moment"

export const formatDate = (date) => {
  return date ? moment(date).format('YYYY-MM-DD') : null
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}