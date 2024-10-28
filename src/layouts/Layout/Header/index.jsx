// 樣式模組 (css module)
import S from './style.module.css'
// 工具 (utils)
import { privateAvatarSrc } from '../../../utils/avatarSrc'
// 自訂函式 (custom function)
import useRedux from '../../../hooks/useRedux'
// 組件 (component)
import ProfileLink from './ProfileLink'
import SignLink from './SignLink'
import ThemeToggle from './ThemeToggle'
import LangDrop from './LangDrop'
import Logo from '../../../components/Logo'

// 頁首
function Header() {
  const { user } = useRedux()
  const avatar = privateAvatarSrc(user?.avatar?.link)

  return (
    <div className={S.headerWrapper}>
      <nav className={S.nav}>
        <div className={S.navLeft}></div>
        <div className={S.navRight}>
          {user && <ProfileLink avatar={avatar} username={user?.username} />}
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
