// 函式庫 (library)
import axios from 'axios'
// 工具 (utils)
import { backUrl } from '../utils/url'
// Public
const axiosPublic = axios.create({ baseURL: backUrl })
// Private
const axiosPrivate = axios.create({ baseURL: backUrl, withCredentials: true })
// Request
const axiosRequest = async (isPrivate, method, url, second, third) => {
  const axiosInstance = isPrivate ? axiosPrivate : axiosPublic
  try {
    // GET/DELETE => (url, second: config)
    // POST/PUT/PATCH => (url, second: data, third: condig)
    const response = await axiosInstance[method](url, second, third)
    return response.data
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || '不明錯誤',
      i18n: error.response?.data?.i18n || 'error.defaultError'
    }
  }
}

export default axiosRequest
