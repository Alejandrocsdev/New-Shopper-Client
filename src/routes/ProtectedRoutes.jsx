// 函式庫 (library)
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
// 自訂函式 (custom function)
import { useLang } from '../context/LangContext'
import { refreshToken } from '../api/axios'
import useRedux from '../hooks/useRedux'

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token)
    return exp * 1000 < Date.now()
  } catch (error) {
    return true
  }
}

const ProtectedRoutes = () => {
  const { setAuth, clearAuth, token } = useRedux()
  const location = useLocation()
  const { lang } = useLang()

  const [authState, setAuthState] = useState('loading')

  useEffect(() => {
    const routesAuth = async () => {
      if (token && !isTokenExpired(token)) {
        setAuthState('valid')
      } else {
        try {
          console.log('%cSend [post /auth/refresh] request (Protected Routes)', 'color: aqua;')
          const response = await refreshToken()
          console.log('%cReceive [post /auth/refresh] response (Protected Routes):', 'color: aqua;', response.data.message)
          console.log('%cReceive [post /auth/refresh] data (Protected Routes):', 'color: aqua;', response.data.accessToken)
          setAuth({ token: response.data.accessToken })
          setAuthState('valid')
        } catch (error) {
          console.error('%cCatch [post /auth/refresh] error (Protected Routes):', 'color: aqua;', error.response.data.message)
          clearAuth()
          setAuthState('invalid')
        }
      }
    }
    routesAuth()
  }, [token])

  if (authState === 'loading') return null

  return authState === 'valid'
    ? <Outlet />
    : <Navigate to={`/${lang}/sign-in`} state={{ from: location }} replace />
}

export default ProtectedRoutes
