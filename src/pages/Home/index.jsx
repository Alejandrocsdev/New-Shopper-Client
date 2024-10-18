// 樣式模組 (css module)
import S from './style.module.css'

// 首頁
function Home() {
  return (
    <main className={S.main}>
      <div className={S.div1}>primary</div>
      <div className={S.div2}>secondary</div>
      <div className={S.div3}>tertiary</div>
    </main>
  )
}

export default Home
