// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 組件 (component)
import Logo from '../../../components/Logo'

// 頁首 (Auth)
function AuthHeader() {
  const { t } = useTranslation()
  
  return (
    <header className={S.header}>
      <Logo style={S.logo} isBanner />
      <h1 className={S.pageName}>{t('mode')}</h1>
    </header>
  )
}

export default AuthHeader
