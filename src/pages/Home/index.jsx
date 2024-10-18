// 樣式模組 (css module)
import S from './style.module.css'

// 首頁
function Home() {
  return (
    <main className={S.main}>
      <button className={S.button}>首頁</button>
    </main>
  )
}

export default Home
