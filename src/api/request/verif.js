import axiosRequest from '../axios'

const base = '/verif'

// Private Requests

// Public Requests
export const sendOtp = (phone, isReset = false) => {
  return axiosRequest(false, 'post', `${base}/send/otp`, { phone, isReset })
}

export const verifyOtp = (phone, otp) => {
  return axiosRequest(false, 'post', `${base}/verify/otp`, { phone, otp })
}
