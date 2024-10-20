// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { Outlet } from 'react-router-dom'
// 組件 (component)
import AuthHeader from './AuthHeader'

// 佈局組件 (Auth)
function AuthLayout() {
  return (
    <>
      <AuthHeader />
      <div className={S.container}>
        <Outlet />
      </div>
    </>
  )
}

export default AuthLayout
