// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { useTheme } from '../../../context/ThemeContext'
// 組件 (component)
import Logo from '../../../components/Logo'
import SignLink from './SignLink'
import ThemeToggle from './ThemeToggle'
import LangDrop from './LangDrop'

// 模仿用戶狀態
const user = false

// 頁首
function Header() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  return (
    <div className={S.headerWrapper}>
      <nav className={S.nav}>
        <div className={S.navLeft}>Left</div>
        <div className={S.navRight}>
          {!user && <SignLink />}
          <ThemeToggle />
          <LangDrop />
        </div>
      </nav>
      <header className={S.header}>
        <Logo style={`${S.logo} ${S.large}`} color={isDark ? 'dark' : 'light'} />
        <Logo style={`${S.logo} ${S.small}`} color={isDark ? 'dark' : 'light'} type="cart" text />
      </header>
    </div>
  )
}

export default Header
