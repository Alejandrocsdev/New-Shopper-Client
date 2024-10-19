// 函式庫 (library)
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
// 資料 (data)
import translations from '../assets/locales/translations.json'

i18next.use(initReactI18next).init({
  resources: translations,
  // Local Storage || HTML Tag || Default
  lng: localStorage.getItem('lang') || document.documentElement.lang || 'zh',
  fallbackLng: 'zh',
  supportedLngs: ['zh', 'en', 'es'],
  // React already does escaping
  interpolation: { escapeValue: false }
})

const supportedLngs = i18next.options.supportedLngs

export { i18next, supportedLngs }
