import axiosRequest from '../axiosRequest'

const base = '/verif'

// Private Requests

// Public Requests
export const sendOtp = (phone, isReset = false) => {
  console.log('Send [post /verif/send/otp] request')
  return axiosRequest(false, 'post', `${base}/send/otp`, { phone, isReset })
}
export const verifyOtp = (phone, otp) => {
  console.log('Send [post /verif/verify/otp] request')
  return axiosRequest(false, 'post', `${base}/verify/otp`, { phone, otp })
}
export const sendLink = (email, lang) => {
  console.log('Send [post /verif/send/link] request')
  return axiosRequest(false, 'post', `${base}/send/link`, { email, lang })
}