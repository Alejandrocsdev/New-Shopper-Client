// 函式庫 (library)
import axios from 'axios'
// 自訂函式 (custom function)
import { store } from '../redux/store'
import { setCredentials, clearCredentials } from '../redux/authSlice'
// 工具 (utils)
import { backUrl } from '../utils/url'
import { colorLog } from '../utils/colorize'
// Public
export const axiosPublic = axios.create({ baseURL: backUrl })
// Private
const axiosPrivate = axios.create({ baseURL: backUrl, withCredentials: true })

// Request Interceptor
axiosPrivate.interceptors.request.use(
  (config) => {
    colorLog('Request interceptor:', 'green', config)
    const token = store.getState().auth.token
    // 有 授權憑證 即發送 認證標頭
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor
axiosPrivate.interceptors.response.use(
  (response) => {
    colorLog('Response interceptor:', 'green', response)
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const { method, url } = originalRequest
    const status = error.response.status
    // 特定請求錯誤訊息
    console.log(`Catch [${method} ${url}] error:`, error.response.data.message)

    // 401: Unauthorized
    // 403: Forbidden
    if ((status === 401 || status === 403) && !originalRequest.retry) {
      // 標記已重新發送請求
      originalRequest.retry = true

      try {
        // 發送刷新請求
        colorLog('Send {{[post /auth/refresh]}} request', 'aqua')
        const refreshResponse = await axios.post(`${backUrl}/auth/refresh`, {}, { withCredentials: true })

        // 取得刷新後憑證
        const newToken = refreshResponse.data.accessToken
        colorLog('Receive {{[post /auth/refresh]}} data:', 'aqua', newToken)

        // 存儲憑證
        store.dispatch(setCredentials({ token: newToken }))
        
        // 重新發送請求
        colorLog(`Retry {{[${method} ${url}]}} request`, 'yellow')
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return axiosPrivate(originalRequest)
      } catch (refreshError) {
        // 刷新憑證失敗
        colorLog('Catch {{[post /auth/refresh]}} error:', 'aqua', refreshError.response.data.message)

        // 移除用戶資料
        store.dispatch(clearCredentials())
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export { axiosPrivate }
