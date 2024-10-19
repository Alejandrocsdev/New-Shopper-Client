// 函式庫 (library)
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// 資料 (json)
import translations from '../assets/locales/translations.json'

const htmlTag = document.querySelector('html').lang || 'zh'

// 語言設定
i18n.use(initReactI18next).init({
  resources: translations,
  lng: htmlTag,
  fallbackLng: 'zh',
  supportedLngs: ['zh', 'en', 'es']
})

export { i18n }
