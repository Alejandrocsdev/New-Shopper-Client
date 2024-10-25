// 自訂函式 (custom function)
import { axiosPublic, axiosPrivate } from './axios'

// Request
const axiosRequest = async (isPrivate, method, url, data) => {
  const axiosInstance = isPrivate ? axiosPrivate : axiosPublic
  try {
    const requestData = method === 'get' || method === 'delete' ? { params: data } : data
    const response = await axiosInstance[method](url, requestData)
    return response.data
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || '不明錯誤',
      i18n: error.response?.data?.i18n || 'error.defaultError'
    }
  }
}

export default axiosRequest
