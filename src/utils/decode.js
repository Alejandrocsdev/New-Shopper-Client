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

export const isAllowed = (token, allowedRoles) => {
  try {
    const { roles } = jwtDecode(token)
    return roles.some(role => allowedRoles.includes(role))
  } catch (error) {
    return false
  }
}