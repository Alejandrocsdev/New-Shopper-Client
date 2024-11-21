import axiosRequest from '../axiosRequest'

const base = '/auth'

// Private Requests
export const autoSignIn = userId => {
  console.log('Send [post /auth/sign-in/auto/:userId] request')
  return axiosRequest(true, 'post', `${base}/sign-in/auto/${userId}`)
}
export const pwdSignIn = (signInKey, password) => {
  console.log('Send [post /auth/sign-in/pwd] request')
  return axiosRequest(true, 'post', `${base}/sign-in/pwd`, { signInKey, password })
}
export const smsSignIn = (phone, otp) => {
  console.log('Send [post /auth/sign-in/sms] request')
  return axiosRequest(true, 'post', `${base}/sign-in/sms`, { phone, otp })
}
export const signOut = () => {
  console.log('Send [post /auth/sign-out] request')
  return axiosRequest(true, 'post', `${base}/sign-out`)
}
export const getAuthUser = () => {
  console.log('%cSend [get /auth/me] request', 'color: orange;')
  return axiosRequest(true, 'get', `${base}/me`)
}

// Public Requests
export const signUp = (phone, password) => {
  console.log('Send [post /auth/sign-up] request')
  return axiosRequest(false, 'post', `${base}/sign-up`, { phone, password })
}
