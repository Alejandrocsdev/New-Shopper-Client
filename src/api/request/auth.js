import axiosRequest from '../axios'

const base = '/auth'

// Private Requests

// Public Requests
export const signUp = (phone, password) => {
  return axiosRequest(false, 'post', `${base}/sign-up`, { phone, password })
}
