// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import GetGovWordSetting from './GetGovWordSetting'
import GetWordSetting from './GetWordSetting'

// 後台
function Admin() {
  return (
    <main className={S.main}>
      <GetGovWordSetting />
      <GetWordSetting/>
    </main>
  )
}

export default Admin
