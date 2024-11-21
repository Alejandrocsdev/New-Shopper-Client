import axiosRequest from '../axiosRequest.mjs'

const base = '/product'

// Private Requests

// Public Requests
export const getProducts = params => {
  return axiosRequest(false, 'get', `${base}/all`, { params })
}
export const getProduct = productId => {
  return axiosRequest(false, 'get', `${base}/${productId}`)
}
