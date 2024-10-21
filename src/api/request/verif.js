import axiosRequest from '../axios'

const base = '/verif'

// Private Requests

// Public Requests
export const sendOtp = (phone) => {
  return axiosRequest(false, 'post', `${base}/send/otp`, { phone })
}
