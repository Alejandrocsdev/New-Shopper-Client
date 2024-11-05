// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import Anchor from '../../components/Anchor'
import PaymentButton from '../../components/PaymentButton'

// 首頁
function Home() {
  return (
    <main className={S.main}>
      <div>Home</div>
      {/* <PaymentButton
        orderId="12345"
        TotalAmount="10710"
        ItemName="鋼彈 x 2 x 100#金鋼狼 x 1 x 500#蜘蛛人 x 10 x 10000#膽小狗英雄x 1 x 10"
      /> */}
    </main>
  )
}

export default Home
