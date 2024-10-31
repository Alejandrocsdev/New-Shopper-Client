import axiosRequest from '../axiosRequest'

const base = '/ecpay'

// Private Requests
export const payment = (orderId, TotalAmount, ItemName) => {
  return axiosRequest(true, 'get', `${base}/payment`, {
    params: { orderId, TotalAmount, ItemName }
  })
}

// Public Requests
