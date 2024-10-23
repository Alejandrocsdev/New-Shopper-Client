import axiosRequest from '../axios'

const base = '/user'

// Private Requests

// Public Requests
export const findUserByInfo = (userInfo) => {
  return axiosRequest(false, 'get', `${base}/find/${userInfo}`)
}

export const putPwdByInfo = (userInfo, password) => {
  return axiosRequest(false, 'put', `${base}/pwd/${userInfo}`, { password })
}