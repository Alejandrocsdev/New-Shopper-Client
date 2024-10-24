import axiosRequest from '../axios'

const base = '/notif'

// Private Requests

// Public Requests
export const resetPwdPhone = (phone) => {
  return axiosRequest(false, 'post', `${base}/reset/password/phone`, { phone })
}
export const resetPwdEmail = (email) => {
  return axiosRequest(false, 'post', `${base}/reset/password/email`, { email })
}