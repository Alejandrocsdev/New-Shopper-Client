// 樣式 (css)
import './assets/css/global.css'
import './assets/css/font.css'
// 函式庫 (library)
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
// 自訂函式 (custom function)
import i18next from './utils/i18next'
import { LangProvider } from './context/LangContext'
import { ThemeProvider } from './context/ThemeContext'
// 佈局組件
import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'
// 頁面 (pages)
import Home from './pages/Home'
import SignUp from './pages/SignUp'

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
        <Routes>
          <Route path="/:lang/*" element={<LangRoutes />}>
            <Route path="" element={<AuthLayout />}>
              <Route path="sign-up" element={<SignUp />} />
            </Route>

            <Route path="" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
          </Route>
          {/* host/ => host/:lang */}
          <Route path="/" element={<Navigate to={`/${i18next.language}`} />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
