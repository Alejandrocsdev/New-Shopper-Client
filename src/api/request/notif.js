import axiosRequest from '../axiosRequest'

const base = '/notif'

// Private Requests

// Public Requests
export const resetPwdPhone = (phone) => {
  return axiosRequest(false, 'post', `${base}/reset/pwd/phone`, { phone })
}
export const resetPwdEmail = (email) => {
  return axiosRequest(false, 'post', `${base}/reset/pwd/email`, { email })
}