import moment from "moment"

export const formatDate = (date) => {
  return date ? moment(date).format('YYYY-MM-DD') : null
}
