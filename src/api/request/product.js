import axiosRequest from '../axiosRequest'

const base = '/product'

// Private Requests

// Public Requests
export const getProducts = (params) => {
  return axiosRequest(false, 'get', `${base}/all`, { params })
}
