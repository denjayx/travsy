import axios from 'axios'

const BASE_URL = import.meta.env.VITE_DEV_BASE_URL || '/api'

export const BASE_IMAGEURL = import.meta.env.VITE_DEV_BASE_IMAGE_URL || ''

export const getPopularPackages = async () => {
  try {
    const response = await axios(`${BASE_URL}/packages/popular`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching popular packages:', error)
    throw error
  }
}

export const getPackageDetail = async (id) => {
  try {
    const response = await axios(`${BASE_URL}/packages/${id}`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching package detail:', error)
    throw error
  }
}

export const getProfilePackages = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/packages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching package list:', error)
    throw error
  }
}

export const getTransactionHistory = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/histories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching histoory:', error)
    throw error
  }
}

export const getTransactionDetail = async (token, id) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/histories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching history detail:', error)
    throw error
  }
}

export const getProfilePackageDetail = async (token, id) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/packages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching package list:', error)
    throw error
  }
}

export const getHistoryDetail = async (token, id) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/histories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching history detail:', error)
    throw error
  }
}

export const createPackage = async (token, formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/profile/packages`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response.data.message
  } catch (error) {
    console.error('Error fetching package list:', error)
    throw error
  }
}

export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching profile:', error)
    throw error
  }
}

export const updateProfile = async (token, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetch put profile :', error)
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
    throw new Error(error.response.data.message)
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
    throw new Error(error.response.data.message)
  }
}

export const getPackageList = async (queryParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/packages`, {
      params: {
        ...queryParams,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const deletePackage = async ({ token, id }) => {
  try {
    const response = await axios.delete(`${BASE_URL}/profile/packages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.message
  } catch (error) {
    console.error('Error fetching package list:', error)
    throw error
  }
}

export const pay = async ({ token, id, data }) => {
  try {
    const response = await axios.post(`${BASE_URL}/packages/${id}/pay`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching package list:', error)
    throw error
  }
}

export const getOrderList = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching package list:', error)
    throw error
  }
}

export const updateStatusOrder = async (token, id, status) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/profile/orders/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data.data
  } catch (error) {
    console.error('Error fetching package list:', error)
    throw error
  }
}
