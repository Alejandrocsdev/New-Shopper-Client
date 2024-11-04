import axiosRequest from '../axiosRequest'

const base = '/user'

// Private Requests
export const putUserImage = (formData) => {
  console.log('Send [put /user] request')
  return axiosRequest(true, 'put', `${base}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const putUser = (userId, formData) => {
  console.log('Send [put /user/:userId] request')
  return axiosRequest(true, 'put', `${base}/${userId}`, formData)
}

// Public Requests
export const findUserByInfo = (userInfo) => {
  console.log('Send [get /user/find/:userInfo] request')
  return axiosRequest(false, 'get', `${base}/find/${userInfo}`)
}
export const putPwdByInfo = (userInfo, password) => {
  console.log('Send [put /user/pwd/:userInfo] request')
  return axiosRequest(false, 'put', `${base}/pwd/${userInfo}`, { password })
}
