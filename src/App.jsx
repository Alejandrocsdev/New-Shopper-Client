// 樣式 (css)
import './assets/css/global.css'
import './assets/css/font.css'
// 函式庫 (library)
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
// 自訂函式 (custom function)
import i18next from './utils/i18next'
import { LangProvider } from './context/LangContext'
import { ThemeProvider } from './context/ThemeContext'
import { ErrorProvider } from './context/ErrorContext'
// 佈局組件
import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'
// 頁面 (pages)
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Reset from './pages/Reset'

const LangRoutes = () => {
  return (
    // must be wrapped inside LangRoutes to access useParams
    <LangProvider>
      <Outlet />
    </LangProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ErrorProvider>
          <Routes>
            <Route path="/:lang/*" element={<LangRoutes />}>
              <Route path="" element={<AuthLayout />}>
                <Route path="sign-up" element={<SignUp />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="reset" element={<Reset />} />
              </Route>

              <Route path="" element={<Layout />}>
                <Route index element={<Home />} />
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            {/* host/ => host/:lang */}
            <Route path="/" element={<Navigate to={`/${i18next.language}`} />} />
          </Routes>
        </ErrorProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
