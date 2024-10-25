// 樣式 (css)
import './assets/css/global.css'
import './assets/css/font.css'
// 工具 (utils)
import { colorLog, colorError } from './utils/colorize'
// 函式庫 (library)
import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// 自訂函式 (custom function)
import { getAuthUser } from './api/request/user'
import useRedux from './hooks/useRedux'
import i18next from './utils/i18next'
import { ThemeProvider } from './context/ThemeContext'
import { ErrorProvider } from './context/ErrorContext'
// 佈局組件 (layouts)
import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'
// 路徑 (routes)
import LangRoutes from './routes/LangRoutes'
import ProtectedRoutes from './routes/ProtectedRoutes'
// 公開頁面 (public pages)
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Reset from './pages/Reset'
// 保護頁面 (private pages)
import Profile from './pages/Profile'

function App() {
  const { setAuth, token } = useRedux()
  const triggerCount = useRef(0)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await getAuthUser()
        colorLog('Receive {{[get /user/me]}} response:', 'orange', response.message)
        colorLog('Receive {{[get /user/me]}} data:', 'orange', response.user)
        setAuth({ user: response.user })
      } catch (error) {
        colorError('Catch {{[get /user/me]}} error:', 'orange', error.message)
        triggerCount.current = 2
      }
    }

    // 0 => 1. mount: null > token 1
    // 1 => 1. token change: null > token 1 (prevent)
    // 2 => 2. token change: token 1 > token 2
    if (triggerCount.current !== 1) {
      colorLog('Send {{[get /user/me]}} request', 'orange')
      initializeAuth()
    }
    if (triggerCount.current < 2) triggerCount.current += 1
  }, [token])

  return (
    <BrowserRouter>
      <ErrorProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/:lang/*" element={<LangRoutes />}>
              {/* Public Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="sign-up" element={<SignUp />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="reset" element={<Reset />} />
              </Route>

              <Route element={<Layout />}>
                {/* Public Routes */}
                <Route index element={<Home />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoutes />}>
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Route>

              {/* host/:lang/wrong => host/:lang */}
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            {/* host/ => host/:lang */}
            <Route path="/" element={<Navigate to={`/${i18next.language}`} />} />
          </Routes>
        </ThemeProvider>
      </ErrorProvider>
    </BrowserRouter>
  )
}

export default App
