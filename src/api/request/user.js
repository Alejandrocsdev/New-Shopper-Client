import axiosRequest from '../axiosRequest'

const base = '/user'

// Private Requests

// Public Requests
export const findUserByInfo = (userInfo) => {
  console.log('Send [get /user/find/:userInfo] request')
  return axiosRequest(false, 'get', `${base}/find/${userInfo}`)
}
export const putPwdByInfo = (userInfo, password) => {
  console.log('Send [put /user/pwd/:userInfo] request')
  return axiosRequest(false, 'put', `${base}/pwd/${userInfo}`, { password })
}