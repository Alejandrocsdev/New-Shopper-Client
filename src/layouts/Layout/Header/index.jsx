// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import ThemeToggle from './ThemeToggle'

// 頁首
function Header() {
  return (
    <div className={S.headerWrapper}>
      <nav className={S.nav}>
        <div className={S.navLeft}>Left</div>
        <div className={S.navRight}>
          <ThemeToggle />
        </div>
      </nav>
      <header className={S.header}>Header</header>
    </div>
  )
}

export default Header
