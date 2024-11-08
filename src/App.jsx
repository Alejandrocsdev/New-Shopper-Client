// 樣式 (css)
import './assets/css/global.css'
import './assets/css/font.css'
// 函式庫 (library)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// 自訂函式 (custom function)
import i18next from './utils/i18next'
import { ThemeProvider } from './context/ThemeContext'
import { MessageProvider } from './context/MessageContext'
import useLoader from './hooks/useLoader'
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
import History from './pages/Profile/History'
import Kyc from './pages/Profile/Kyc'
import Admin from './pages/Admin'
import Seller from './pages/Seller'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  const loading = useLoader()

  if (loading) {
    return <Loader loading={true} />
  }

  return (
    <BrowserRouter>
      <MessageProvider>
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
                {/* Semi-Protected Routes */}
                <Route index element={<Home />} />
                <Route path="product/:productId" element={<Product />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoutes allowedRoles={['buyer', 'seller', 'admin', 'editor', 'viewer']} />}>
                  <Route path="profile" element={<Profile />}>
                    <Route path="info" element={<Info />} />
                    <Route path="address" element={<Address />} />
                    <Route path="History" element={<History />} />
                    <Route path="kyc" element={<Kyc />} />
                    {/* Redirect to info by default if no subpath is specified */}
                    <Route index element={<Navigate to="info" />} />
                  </Route>
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                </Route>

                <Route element={<ProtectedRoutes allowedRoles={['seller', 'admin', 'editor', 'viewer']} />}>
                  <Route path="seller" element={<Seller />} />
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
          </Routes>
        </ThemeProvider>
      </MessageProvider>
    </BrowserRouter>
  )
}

export default App
