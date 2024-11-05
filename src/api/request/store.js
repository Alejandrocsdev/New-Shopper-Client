import axiosRequest from '../axiosRequest'

const base = '/store'

// Private Requests
export const deleteStore = (storeId) => {
  return axiosRequest(true, 'delete', `${base}/${storeId}`)
}
export const putStoreDefault = (storeId) => {
  return axiosRequest(true, 'put', `${base}/${storeId}/default`)
}

// Public Requests
