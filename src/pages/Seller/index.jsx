// 樣式模組 (css module)
import S from './style.module.css'

// 賣家中心
function Seller() {
  return (
    <main className={S.main}>
      <div>Seller Center</div>
    </main>
  )
}

export default Seller