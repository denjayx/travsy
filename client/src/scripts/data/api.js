import axios from 'axios'
const BASE_URL = 'http://172.188.98.99:3000';
export const getPopularPackages = async () => {
  try {
    const response = await axios(`${BASE_URL}/packages/popular`)
    return response.data.data;
  } catch (error) {
    console.error('Error fetching popular packages:', error);
    throw error;
  }
}
export const getPackageList = async () => {
  try {
    const response = axios(`${BASE_URL}/packages`)
    return response.data.data;
  } catch (error) {
    console.error('Error fetching package list:', error);
    throw error;
  }
}
export const packageDetail = async (id) => {
  try {
    const response = axios(`${BASE_URL}/packages/${id}`)
    return response;
  } catch (error) {
    console.error('Error fetching package detail:', error);
    throw error;
  }
}
export const login = async({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email, password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data.data;
  } catch (error) {
    console.error('Error fetching package detail:', error);
    throw error;
  }
}
