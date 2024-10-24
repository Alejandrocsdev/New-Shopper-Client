// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useAuth } from '../../../context/AuthContext'
// 組件 (component)
import ProfileLink from './ProfileLink'
import SignLink from './SignLink'
import ThemeToggle from './ThemeToggle'
import LangDrop from './LangDrop'
import Logo from '../../../components/Logo'

// 頁首
function Header() {
  const { user } = useAuth().auth

  return (
    <div className={S.headerWrapper}>
      <nav className={S.nav}>
        <div className={S.navLeft}></div>
        <div className={S.navRight}>
          {user && <ProfileLink avatar={user?.avatar} username={user?.username} />}
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
