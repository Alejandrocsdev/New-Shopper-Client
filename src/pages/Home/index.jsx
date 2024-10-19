// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'

// 首頁
function Home() {
  const { t } = useTranslation()

  return (
    <main className={S.main}>
      <div className={S.div1}>{t('home.primary')}</div>
      <div className={S.div2}>secondary</div>
      <div className={S.div3}>tertiary</div>
    </main>
  )
}

export default Home
