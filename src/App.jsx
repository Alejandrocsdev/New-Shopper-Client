// 樣式 (css)
import './assets/css/global.css'
import './assets/css/font.css'
// 函式庫 (library)
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// 自訂函式 (custom function)
import i18next from './utils/i18next'
import { ThemeProvider } from './context/ThemeContext'
import { ErrorProvider } from './context/ErrorContext'
import useCheckBackend from './hooks/useCheckBackend'
// 載入組件 (loader)
import Loader from './components/Loader'
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
import Info from './pages/Profile/Info'
import Address from './pages/Profile/Address'
import Admin from './pages/Admin'

function App() {
  const [loading, setLoading] = useState(true)

  useCheckBackend(setLoading)

  return (
    <BrowserRouter>
      <ErrorProvider>
        <ThemeProvider>
          {loading 
          ? <Loader loading={loading} />
          : <Routes>
              <Route path="/:lang/*" element={<LangRoutes />}>
                {/* Public Auth Routes */}
                <Route element={<AuthLayout />}>
                  <Route path="sign-up" element={<SignUp />} />
                  <Route path="sign-in" element={<SignIn />} />
                  <Route path="reset" element={<Reset />} />
                </Route>

                <Route element={<Layout />}>
                  {/* Semi-Protected Routes */}
                  <Route index element={<Home />} />

                  {/* Protected Routes */}
                  <Route element={<ProtectedRoutes allowedRoles={['buyer', 'seller', 'admin', 'editor', 'viewer']} />}>
                    {/* <Route path="profile" element={<Profile />} /> */}
                    <Route path="profile" element={<Profile />}>
                      <Route path="info" element={<Info />} />
                      <Route path="address" element={<Address />} />
                      {/* Redirect to info by default if no subpath is specified */}
                      <Route index element={<Navigate to="info" />} />
                    </Route>
                  </Route>

                  <Route element={<ProtectedRoutes allowedRoles={['admin', 'editor', 'viewer']} />}>
                    <Route path="admin" element={<Admin />} />
                  </Route>
                </Route>

                {/* Redirect to host/:lang when the path is not matched */}
                <Route path="*" element={<Navigate to="/" />} />
              </Route>

              {/* Redirect from root to the default language */}
              <Route path="/" element={<Navigate to={`/${i18next.language}`} />} />
            </Routes>}
        </ThemeProvider>
      </ErrorProvider>
    </BrowserRouter>
  )
}

export default App
