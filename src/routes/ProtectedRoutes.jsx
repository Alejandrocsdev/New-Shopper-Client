// 函式庫 (library)
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// 自訂函式 (custom function)
import { useLang } from '../context/LangContext'

const ProtectedRoutes = () => {
  const token = useSelector((state) => state.auth.token)
  const location = useLocation()
  const { lang } = useLang()

  return token ? <Outlet /> : <Navigate to={`/${lang}/sign-in`} state={{ from: location }} replace />
}

export default ProtectedRoutes
