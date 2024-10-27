import axiosRequest from '../axiosRequest'

const base = '/notif'

// Private Requests

// Public Requests
export const resetPwdPhone = (phone) => {
  console.log('Send [post /reset/pwd/phone] request')
  return axiosRequest(false, 'post', `${base}/reset/pwd/phone`, { phone })
}
export const resetPwdEmail = (email) => {
  console.log('Send [post /reset/pwd/email] request')
  return axiosRequest(false, 'post', `${base}/reset/pwd/email`, { email })
}