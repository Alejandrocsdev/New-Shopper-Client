// 工具 (util)
import { isTokenExpired, isAllowed } from '../utils/decode'
import { promiseQueue } from '../utils/promiseQueue'
// 函式庫 (library)
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
// 自訂函式 (custom function)
import { useLang } from '../context/LangContext'
import { refreshToken } from '../api/axios'
import useRedux from '../hooks/useRedux'

const ProtectedRoutes = ({ allowedRoles }) => {
  const { setAuth, clearAuth, token } = useRedux()
  const location = useLocation()
  const { lang } = useLang()

  const [state, setState] = useState('loading')
  const [errMsg, setErrMsg] = useState(null)

  useEffect(() => {
    const routesAuth = async () => {
      if (token && !isTokenExpired(token) && isAllowed(token, allowedRoles)) {
        setState('valid')
      } else {
        try {
          const response = await promiseQueue(() => refreshToken('(ProtectedRoutes)'))
          console.log(
            '%cReceive [post /auth/refresh] response (Protected Routes):',
            'color: aqua;',
            response.data.message
          )
          console.log(
            '%cReceive [post /auth/refresh] data (Protected Routes):',
            'color: aqua;',
            response.data.accessToken
          )
          if (isAllowed(response.data.accessToken, allowedRoles)) {
            setAuth({ token: response.data.accessToken })
            setState('valid')
          } else {
            clearAuth()
            setState('invalid')
            setErrMsg('error.signInAgain')
          }
        } catch (error) {
          console.error(
            '%cCatch [post /auth/refresh] error (Protected Routes):',
            'color: aqua;',
            error.response.data.message
          )
          clearAuth()
          setState('invalid')
          setErrMsg(error.response.data.i18n)
        }
      }
    }
    routesAuth()
  }, [token, location.pathname])

  if (state === 'loading') return null

  return state === 'valid' ? (
    <Outlet />
  ) : (
    <Navigate to={`/${lang}/sign-in`} state={{ from: location, errMsg }} replace />
  )
}

export default ProtectedRoutes
