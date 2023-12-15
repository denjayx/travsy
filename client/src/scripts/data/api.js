import axios from 'axios'

const BASE_URL = 'http://172.188.98.99:3000'

export const getPopularPackages = async () => {
  try {
    const response = await axios(`${BASE_URL}/packages/popular`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching popular packages:', error)
    throw error
  }
}

export const getPackageList = async () => {
  try {
    const response = axios(`${BASE_URL}/packages`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching package list:', error)
    throw error
  }
}

export const packageDetail = async (id) => {
  try {
    const response = axios(`${BASE_URL}/packages/${id}`)
    return response
  } catch (error) {
    console.error('Error fetching package detail:', error)
    throw error
  }
}

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const user = response.data.data
    localStorage.setItem('token', user.token)
    return user
  } catch (error) {
    console.error('Error fetching login:', error)
    throw error
  }
}

export const revalidate = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/revalidate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const user = response.data.data
    localStorage.setItem('token', user.token)
    return user
  } catch (error) {
    console.error('Error revalidating token:', error)
    throw error
  }
}

export const register = async ({ user, account }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/register`,
      {
        user,
        account,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data.data
  } catch (error) {
    console.error('Error fetching register:', error)
    throw error
  }
}

export const filterPackages = async (
  search,
  city,
  pmin,
  pmax,
  ndest,
  sdate,
  edate,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/packages`, {
      params: {
        search,
        city,
        pmin,
        pmax,
        ndest,
        sdate,
        edate,
      },
    })

    return response.data.data // Sesuaikan ini sesuai dengan format respons yang sebenarnya
  } catch (error) {
    console.error('Error fetching packages:', error)
    throw error // Bisa dihapus jika tidak perlu dilemparkan ke luar
  }
}

export const filtrePackages = async (
  search,
  city,
  pmin,
  pmax,
  ndest,
  sdate,
  edate,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/packages`, {
      params: {
        search,
        city,
        pmin,
        pmax,
        ndest,
        sdate,
        edate,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
