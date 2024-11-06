// 樣式模組 (css module)
import S from './style.module.css'
// 工具 (utils)
import { privateAvatarSrc } from '../../../utils/avatarSrc'
// 自訂函式 (custom function)
import useRedux from '../../../hooks/useRedux'
// 組件 (component)
import ProfileLink from './ProfileLink'
import AdminLink from './AdminLink'
import SignLink from './SignLink'
import ThemeToggle from './ThemeToggle'
import LangDrop from './LangDrop'
import Logo from '../../../components/Logo'
import Icon from '../../../components/Icon'

// 頁首
function Header() {
  const { user } = useRedux()
  const avatar = privateAvatarSrc(user?.avatar?.link)
  const allowedRoles = ['admin', 'editor', 'viewer']
  let isAllowed
  if (user) {
    const roles = user.roles.map((role) => role.name)
    isAllowed = roles.some((role) => allowedRoles.includes(role))
  }

  return (
    <div className={S.headerWrapper}>
      <nav className={S.nav}>
        <div className={S.navLeft}></div>
        <div className={S.navRight}>
          {isAllowed && <AdminLink />}
          {user && <ProfileLink avatar={avatar} username={user?.username} />}
          {!user && <SignLink />}
          <ThemeToggle />
          <LangDrop />
        </div>
      </nav>
      <header className={S.header}>
        <Logo style={`${S.logo} ${S.large}`} isBanner />
        <Logo style={`${S.logo} ${S.small}`} shape="round" text />
        <div className={S.searchContainer}>
          <input className={S.searchInput} type="text" placeholder="請輸入搜尋關鍵字" />
          <button className={S.searchButton}>
            <Icon style={S.searchIcon} icon='faMagnifyingGlass' />
          </button>
        </div>
        {/* 購物車 */}
        <div className={S.cartContainer}>
          <Icon style={S.cartIcon} icon='faCartShopping' />
        </div>
      </header>
    </div>
  )
}

export default Header
