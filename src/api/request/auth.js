import axiosRequest from '../axiosRequest'

const base = '/auth'

// Private Requests
export const autoSignIn = (userId) => {
  return axiosRequest(true, 'post', `${base}/sign-in/auto/${userId}`)
}
export const pwdSignIn = (signInKey, password) => {
  return axiosRequest(true, 'post', `${base}/sign-in/pwd`, { signInKey, password })
}
export const smsSignIn = (phone, otp) => {
  return axiosRequest(true, 'post', `${base}/sign-in/sms`, { phone, otp })
}
export const signOut = () => {
  return axiosRequest(true, 'post', `${base}/sign-out`)
}
export const getAuthUser = () => {
  return axiosRequest(true, 'get', `${base}/me`)
}

// Public Requests
export const signUp = (phone, password) => {
  return axiosRequest(false, 'post', `${base}/sign-up`, { phone, password })
}
