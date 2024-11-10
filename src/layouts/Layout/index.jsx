// 模組樣式
import S from './style.module.css'
// 工具 (util)
import { promiseQueue } from '../../utils/promiseQueue'
// 函式庫 (library)
import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
// 自訂函式 (custom function)
import useRedux from '../../hooks/useRedux'
import { getAuthUser } from '../../api/request/auth'
// 組件 (component)
import Header from './Header'
import Footer from '../Footer'
import Message from '../../components/Global/Message'
import ScrollToTop from '../../components/Global/ScrollToTop'

// 佈局組件
function Layout() {
  const { setAuth, clearAuth, user, token } = useRedux()
  const triggerCount = useRef(0)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await promiseQueue(getAuthUser)
        console.log('%cReceive [get /user/me] response:', 'color: orange;', response.message)
        console.log('%cReceive [get /user/me] data:', 'color: orange;', response.user)
        setAuth({ user: response.user })
      } catch (error) {
        console.error('%cCatch [get /user/me] error:', 'color: orange;', error.message)
        clearAuth()
        triggerCount.current = 2
      }
    }

    // 0 => 1. mount: null > token 1
    // 1 => 1. token change: null > token 1 (prevent)
    // 2 => 2. token change: token 1 > token 2
    if (triggerCount.current !== 1) {
      initializeAuth()
    }
    if (triggerCount.current < 2) {
      triggerCount.current += 1
    }
  }, [token])

  return (
    <>
      <ScrollToTop />
      <Header />
      <Message />
      <div className={S.container}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout
