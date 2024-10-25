import axiosRequest from '../axiosRequest'

const base = '/user'

// Private Requests
export const getAuthUser = () => {
  return axiosRequest(true, 'get', `${base}/me`)
}

// Public Requests
export const findUserByInfo = (userInfo) => {
  return axiosRequest(false, 'get', `${base}/find/${userInfo}`)
}
export const putPwdByInfo = (userInfo, password) => {
  return axiosRequest(false, 'put', `${base}/pwd/${userInfo}`, { password })
}