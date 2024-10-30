// 樣式模組 (css module)
import S from './style.module.css'

// 後台
function Admin() {
  return (
    <main className={S.main}>
      <div>Admin Panel</div>
    </main>
  )
}

export default Admin