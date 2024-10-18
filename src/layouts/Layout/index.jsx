// 函式庫 (library)
import { Outlet } from 'react-router-dom'
// 組件 (component)
import Header from './Header'

// 佈局組件
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout
