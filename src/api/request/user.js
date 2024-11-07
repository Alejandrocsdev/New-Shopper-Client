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
export const postUserRole = (role) => {
  console.log('Send [post /user/role] request')
  return axiosRequest(true, 'post', `${base}/role`, { role })
}
export const postUserCart = (productId, quantity, unitPrice) => {
  console.log('Send [post /user/cart/:productId] request')
  return axiosRequest(true, 'post', `${base}/cart/${productId}`, { quantity, unitPrice })
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
