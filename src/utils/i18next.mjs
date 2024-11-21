// 函式庫 (library)
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
// 資料 (json)
import translations from '../assets/locales/translations.json'

const htmlTag = document.documentElement.getAttribute('lang')

// 語言設定
i18next.use(initReactI18next).init({
  resources: translations,
  lng: localStorage.getItem('lang') || htmlTag,
  fallbackLng: htmlTag,
  supportedLngs: ['zh', 'en', 'es']
})

export default i18next
