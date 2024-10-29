// 樣式模組 (css module)
import S from './style.module.css'

import Anchor from '../../components/Anchor'

const { VITE_TEST } = import.meta.env

// 首頁
function Home() {
  console.log(VITE_TEST)
  return (
    <main className={S.main}>
      <Anchor int="/sign-in">Sign In</Anchor>
      <Anchor int="/profile">Profile</Anchor>
    </main>
  )
}

export default Home
