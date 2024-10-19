// 函式庫 (library)
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { i18n } from '../utils/i18n'
// 資料 (data)
import languages from '../assets/locales/languages'

function useChangeLanguage() {
  const { t } = useTranslation()
  const [currentLang, setCurrentLang] = useState(i18n.language || 'zh')

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
    setCurrentLang(code)

    const selectedLang = languages.find((language) => language.code === code)

    if (selectedLang) {
      document.title = t('shopper.title')
      document.documentElement.dir = selectedLang.dir || 'ltr'
    }
  }

  return { currentLang, changeLanguage, languages }
}

export default useChangeLanguage
