// 函式庫 (library)
import { useTranslation } from 'react-i18next'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { createContext, useContext, useEffect } from 'react'
// 自訂函式 (custom function)
import i18next from '../utils/i18next'

const LangContext = createContext()

// (1) Provider
export const LangProvider = ({ children }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  // 自訂 useState
  const lang = i18next.language
  const setLang = lang => {
    i18next.changeLanguage(lang)
    localStorage.setItem('lang', lang)
  }

  const supportedLngs = i18next.options.supportedLngs
  const { lang: langParam } = useParams()

  // 路徑變更
  useEffect(() => {
    if (supportedLngs.includes(langParam)) {
      setLang(langParam)
    } else {
      // host/wrong => host/:lang
      navigate(`/${lang}`)
    }
  }, [langParam])

  // 語言切換
  const switchLang = code => {
    setLang(code)
    const newPath = location.pathname.replace(`/${langParam}`, `/${code}`)
    navigate(newPath)
  }

  // 切換網頁標題
  useEffect(() => {
    document.title = t('shopper.title')
  }, [lang])

  return <LangContext.Provider value={{ lang, switchLang }}>{children}</LangContext.Provider>
}

// (2) Hook
export const useLang = () => useContext(LangContext)
