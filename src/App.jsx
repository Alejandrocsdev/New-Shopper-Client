// 樣式 (css)
import './assets/css/global.css'
import './assets/css/font.css'
// 函式庫 (library)
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom'
// 佈局組件
import Layout from './layouts/Layout'
// 頁面 (pages)
import Home from './pages/Home'
import SignUp from './pages/SignUp'
// 語言工具
import { i18next, supportedLngs } from './utils/i18next'
import languages from './assets/locales/languages'
import { useTranslation } from 'react-i18next'

const LangRoutes = () => {
  const { lang } = useParams()

  useEffect(() => {
    if (supportedLngs.includes(lang)) {
      i18next.changeLanguage(lang)
      localStorage.setItem('lang', lang)
    }
  }, [lang])

  if (!supportedLngs.includes(lang)) {
    // host/wrong => host/zh
    return <Navigate to={`/${i18next.language}`} />
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  )
}

function App() {
  const currentLangObj = languages.find((lang) => lang.code === i18next.language)
  const { t } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = currentLangObj.dir || 'ltr'
    document.title = t('shopper.title')
  }, [currentLangObj, t])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang/*" element={<LangRoutes />} />
        {/* host/ => host/zh */}
        <Route path="/" element={<Navigate to={`/${i18next.language}`} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
