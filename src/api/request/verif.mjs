import axiosRequest from '../axiosRequest.mjs'

const base = '/verif'

// Private Requests
export const sendOtpPrivate = (methodData, method, isReset = false) => {
  console.log('Send [post /verif/send/otp] request')
  return axiosRequest(true, 'post', `${base}/send/otp`, { [method]: methodData, isReset })
}
export const verifyOtpPrivate = (methodData, method, otp) => {
  console.log('Send [post /verif/verify/otp] request')
  return axiosRequest(true, 'post', `${base}/verify/otp`, { [method]: methodData, otp })
}

// Public Requests
export const sendOtp = (methodData, method, isReset = false) => {
  console.log('Send [post /verif/send/otp] request')
  return axiosRequest(false, 'post', `${base}/send/otp`, { [method]: methodData, isReset })
}
export const verifyOtp = (methodData, method, otp) => {
  console.log('Send [post /verif/verify/otp] request')
  return axiosRequest(false, 'post', `${base}/verify/otp`, { [method]: methodData, otp })
}
export const sendLink = (email, lang) => {
  console.log('Send [post /verif/send/link] request')
  return axiosRequest(false, 'post', `${base}/send/link`, { email, lang })
}
