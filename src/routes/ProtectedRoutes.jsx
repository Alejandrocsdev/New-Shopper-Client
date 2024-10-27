// 工具 (util)
import { isTokenExpired } from '../utils/isTokenExpired'
import { promiseQueue } from '../utils/promiseQueue'
// 函式庫 (library)
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
// 自訂函式 (custom function)
import { useLang } from '../context/LangContext'
import { refreshToken } from '../api/axios'
import useRedux from '../hooks/useRedux'

const ProtectedRoutes = () => {
  const { setAuth, clearAuth, token } = useRedux()
  const location = useLocation()
  const { lang } = useLang()

  const [state, setState] = useState('loading')

  useEffect(() => {
    const routesAuth = async () => {
      if (token && !isTokenExpired(token)) {
        setState('valid')
      } else {
        try {
          const response = await promiseQueue(() => refreshToken('(ProtectedRoutes)'))
          console.log('%cReceive [post /auth/refresh] response (Protected Routes):', 'color: aqua;', response.data.message)
          console.log('%cReceive [post /auth/refresh] data (Protected Routes):', 'color: aqua;', response.data.accessToken)
          setAuth({ token: response.data.accessToken })
          setState('valid')
        } catch (error) {
          console.error('%cCatch [post /auth/refresh] error (Protected Routes):', 'color: aqua;', error.response.data.message)
          clearAuth()
          setState('invalid')
        }
      }
    }
    routesAuth()
  }, [token])

  if (state === 'loading') return null

  return state === 'valid'
    ? <Outlet />
    : <Navigate to={`/${lang}/sign-in`} state={{ from: location }} replace />
}

export default ProtectedRoutes
