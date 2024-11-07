// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { Outlet } from 'react-router-dom'
// 自訂函式 (custom function)
import { AuthModeProvider } from '../../context/AuthModeContext'
import { AuthStepProvider } from '../../context/AuthStepContext'
// 組件 (component)
import AuthHeader from './AuthHeader'
import Footer from '../Footer'
import Message from '../../components/Message'

// 佈局組件 (Auth)
function AuthLayout() {
  return (
    <AuthModeProvider>
      <AuthStepProvider>
        <AuthHeader />
        <Message/>
        <div className={S.container}>
          <Outlet />
        </div>
        <Footer />
      </AuthStepProvider>
    </AuthModeProvider>
  )
}

export default AuthLayout
