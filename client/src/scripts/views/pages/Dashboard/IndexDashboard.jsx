import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

const IndexDashboard = () => {
  const [loadContext, setLoadContext] = useState(true)
  const { user } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.token) {
      setLoadContext(false)
    }
  }, [user])

  useEffect(() => {
    if (!loadContext) {
      if (!user.token) {
        navigate('/')
      } else {
        navigate('packages')
      }
    }
  }, [loadContext, user, navigate])
}

export default IndexDashboard
