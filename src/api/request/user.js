import axiosRequest from '../axios'

const base = '/user'

// Private Requests
export const getAuthUser = (token) => {
  return axiosRequest(true, 'get', `${base}/me`, {
    headers: { Authorization: token ? `Bearer ${token}` : undefined }
  })
}

// Public Requests
export const findUserByInfo = (userInfo) => {
  return axiosRequest(false, 'get', `${base}/find/${userInfo}`)
}
export const putPwdByInfo = (userInfo, password) => {
  return axiosRequest(false, 'put', `${base}/pwd/${userInfo}`, { password })
}