// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { Outlet } from 'react-router-dom'
// 自訂函式 (custom function)
import { AuthModeProvider } from '../../context/AuthModeContext'
// 組件 (component)
import AuthHeader from './AuthHeader'

// 佈局組件 (Auth)
function AuthLayout() {
  return (
    <AuthModeProvider>
      <AuthHeader />
      <div className={S.container}>
        <Outlet />
      </div>
    </AuthModeProvider>
  )
}

export default AuthLayout
