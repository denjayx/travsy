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
    const response = await axios.get(
      `${BASE_URL}/profile`, {
        headers : {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data.data
  } catch (error) {
    console.error('Error fetching profile:', error);
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
