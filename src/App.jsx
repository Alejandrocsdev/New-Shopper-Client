// 樣式 (css)
import './assets/css/global.css'
import './assets/css/font.css'
// 函式庫 (library)
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// 佈局組件
import Layout from './layouts/Layout'
// 頁面 (pages)
import Home from './pages/Home'
// 語言工具
import { i18next } from './utils/i18next'
import languages from './assets/locales/languages'
import { useTranslation } from 'react-i18next'

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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
