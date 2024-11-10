// 模組樣式 (module css)
import S from './style.module.css'
// 工具 (util)
import { ecpayForm } from '../../../utils/ecpayForm'
// 自訂函式 (custom function)
import { payment } from '../../../api/request/ecpay'
// 環境變數
const { VITE_PAYMENT_ECPAY_API } = import.meta.env

function PaymentButton({ orderId, TotalAmount, ItemName }) {
  const onPayment = async () => {
    try {
      const response = await payment(orderId, TotalAmount, ItemName)
      console.log('Receive [get /ecpay/payment] response:', response.message)
      console.log('Receive [get /ecpay/payment] data:', response.ecPayParams)

      const { ecPayParams } = response

      const action = `${VITE_PAYMENT_ECPAY_API}/Cashier/AioCheckOut/V5`

      ecpayForm(action, ecPayParams)
    } catch (error) {
      console.error('Catch [get /ecpay/payment] error:', error.message)
    }
  }
  return <button onClick={onPayment}>Pay</button>
}

export default PaymentButton

// Content-Security-Policy: 
// The page’s settings blocked an event handler (script-src-attr) from being executed because it violates the following directive: 
// script-src 
// 'unsafe-eval' 
// 'nonce-ecpay1c29dea951984418bf30ac956b082174' 
// 'sha256-XuXw5GxJ82fkrkfnhlqLJtGpx4+OGrmN33kj5xNQvXQ=' 
// 'sha256-6a6dqO3CjATrFWCvTF+8+JFdpbtC9CzljFrI4MVBcXw=' 
// 'sha256-HSkDMpuD5tAej9L3qfr2V3/VC0IdudCJuRACzaM50Hw=' 
// 'sha256-ZtVIGNkdvlhTvz3C7OC3HPZf644+TRoGnhTvIPbn3So=' 
// https://payment-stage.ecpay.com.tw 
// https://gpayment-stage.ecpay.com.tw 
// https://*.googletagmanager.com 
// https://www.googleadservices.com 
// https://googleads.g.doubleclick.net 
// https://www.google.com.tw 
// https://*.google-analytics.com 
// https://analytics.google.com 
// https://payments.developers.google.com 
// https://connect.facebook.net 
// https://*.clarity.ms 
// https://*.bing.com”
