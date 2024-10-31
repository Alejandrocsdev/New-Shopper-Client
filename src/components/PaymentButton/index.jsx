// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
// 自訂函式 (custom function)
import { payment } from '../../api/request/ecpay'
// 組件 (component)

// 表單樣板: 密碼登入樣板 / 簡訊登入樣板 / 註冊樣板
function PaymentButton({ orderId, TotalAmount, ItemName }) {
  console.log('PaymentButton', orderId)
  const onPayment = async () => {
    try {
      // Send payment request to backend
      const response = await payment(orderId, TotalAmount, ItemName)
      console.log('Receive [get /ecpay/payment] response:', response.message)
      console.log('Receive [get /ecpay/payment] data:', response.ecPayParams)

      const { ecPayParams } = response

      const form = document.createElement('form')
      form.setAttribute('method', 'post')
      form.setAttribute('action', 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5')

      Object.keys(ecPayParams).forEach((key) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = ecPayParams[key]
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
    } catch (error) {
      console.error('Catch [get /ecpay/payment] error:', error.message)
    }
  }
  return <button onClick={onPayment}>Pay</button>
}

export default PaymentButton
