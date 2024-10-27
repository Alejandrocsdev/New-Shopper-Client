// 函式庫 (library)
import { jwtDecode } from 'jwt-decode'

export const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token)
    return exp * 1000 < Date.now()
  } catch (error) {
    return true
  }
}