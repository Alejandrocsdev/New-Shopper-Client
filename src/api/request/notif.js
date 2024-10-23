import axiosRequest from '../axios'

const base = '/notif'

// Private Requests

// Public Requests
export const resetCompletePhone = (phone) => {
  return axiosRequest(false, 'post', `${base}/reset/password/phone`, { phone })
}

export const resetCompleteEmail = (email) => {
  return axiosRequest(false, 'post', `${base}/reset/password/email`, { email })
}