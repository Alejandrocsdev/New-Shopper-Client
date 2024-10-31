// 樣式模組 (css module)
import S from './style.module.css'

import Anchor from '../../components/Anchor'
import PaymentButton from '../../components/PaymentButton'
// 首頁
function Home() {
  return (
    <main className={S.main}>
      <div>Home</div>
      <PaymentButton orderId="12345" TotalAmount="256" ItemName="狗狗商品" />
    </main>
  )
}

export default Home
