import axiosRequest from '../axiosRequest'

const base = '/ecpay'

// Private Requests
export const payment = (orderId, TotalAmount, ItemName) => {
  console.log('Send [get /ecpay/payment/params] request')
  return axiosRequest(true, 'get', `${base}/payment/params`, {
    params: { orderId, TotalAmount, ItemName }
  })
}
export const getStoreList = (CvsType) => {
  console.log('Send [get /ecpay/logisticts/store/list/params] request')
  return axiosRequest(true, 'get', `${base}/logisticts/store/list/params`, {
    params: { CvsType }
  })
}
export const getStore = (userId, LogisticsSubType, path) => {
  console.log('Send [get /ecpay/logisticts/store/params] request')
  return axiosRequest(true, 'get', `${base}/logisticts/store/params`, {
    params: { userId, LogisticsSubType, path }
  })
}
export const getGovWordSetting = (payload) => {
  console.log('Send [post /ecpay/einvoice/get-gov-word-setting] request')
  return axiosRequest(true, 'post', `${base}/einvoice/get-gov-word-setting`, payload)
}
export const addWordSetting = (payload) => {
  console.log('Send [post /ecpay/einvoice/add-word-setting] request')
  return axiosRequest(true, 'post', `${base}/einvoice/add-word-setting`, payload)
}
export const setWordStatus = (payload) => {
  console.log('Send [post /ecpay/einvoice/set-word-status] request')
  return axiosRequest(true, 'post', `${base}/einvoice/set-word-status`, payload)
}
export const getWordSetting = (payload) => {
  console.log('Send [post /ecpay/einvoice/get-word-setting] request')
  return axiosRequest(true, 'post', `${base}/einvoice/get-word-setting`, payload)
}
export const issueInvoice = (payload) => {
  console.log('Send [post /ecpay/einvoice/issue] request')
  return axiosRequest(true, 'post', `${base}/einvoice/issue`, payload)
}
export const printInvoice = (payload) => {
  console.log('Send [post /ecpay/einvoice/print] request')
  return axiosRequest(true, 'post', `${base}/einvoice/print`, payload)
}

// Public Requests
