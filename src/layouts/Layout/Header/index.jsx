// 樣式模組 (css module)
import S from './style.module.css'

// 頁首
function Header() {
  return (
    <div className={S.headerWrapper}>
      <nav className={S.nav}>Nav</nav>
      <header className={S.header}>Header</header>
    </div>
  )
}

export default Header
