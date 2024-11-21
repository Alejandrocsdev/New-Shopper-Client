// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { useAuthMode } from '../../../context/AuthModeContext'
// 組件 (component)
import Logo from '../../../components/UI/Logo'

// 頁首 (Auth)
function AuthHeader() {
  const { t } = useTranslation()
  const { mode } = useAuthMode()

  return (
    <header className={S.header}>
      <Logo style={S.logo} isBanner contrast />
      <h1 className={S.pageName}>{t(`sign.${mode}`)}</h1>
    </header>
  )
}

export default AuthHeader
