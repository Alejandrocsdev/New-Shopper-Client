// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { Outlet } from 'react-router-dom'
// 組件 (component)
import Header from './Header'
import Footer from '../Footer'

// 佈局組件
function Layout() {
  return (
    <>
      <Header />
      <div className={S.container}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout
