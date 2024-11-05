import axiosRequest from '../axiosRequest'

const base = '/ecpay'

// Private Requests
export const payment = (orderId, TotalAmount, ItemName) => {
  return axiosRequest(true, 'get', `${base}/payment`, {
    params: { orderId, TotalAmount, ItemName }
  })
}
export const getStoreList = (CvsType) => {
  return axiosRequest(true, 'get', `${base}/store/list`, {
    params: { CvsType }
  })
}
export const getStore = (userId, LogisticsSubType, lang) => {
  return axiosRequest(true, 'get', `${base}/store/express-map`, {
    params: { userId, LogisticsSubType, lang }
  })
}

// Public Requests
