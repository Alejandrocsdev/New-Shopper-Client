// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import SignLink from './SignLink'
import ThemeToggle from './ThemeToggle'
import LangDrop from './LangDrop'
import Logo from '../../../components/Logo'

// 模仿用戶狀態
const user = false

// 頁首
function Header() {
  return (
    <div className={S.headerWrapper}>
      <nav className={S.nav}>
        <div className={S.navLeft}></div>
        <div className={S.navRight}>
          {!user && <SignLink />}
          <ThemeToggle />
          <LangDrop />
        </div>
      </nav>
      <header className={S.header}>
        <Logo style={`${S.logo} ${S.large}`} isBanner />
        <Logo style={`${S.logo} ${S.small}`} shape="round" text />
      </header>
    </div>
  )
}

export default Header
