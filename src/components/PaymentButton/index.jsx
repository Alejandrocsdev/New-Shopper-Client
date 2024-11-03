// 模組樣式 (module css)
import S from './style.module.css'
// 自訂函式 (custom function)
import { payment } from '../../api/request/ecpay'
// 環境變數
const { VITE_ECPAY_API } = import.meta.env

// 表單樣板: 密碼登入樣板 / 簡訊登入樣板 / 註冊樣板
function PaymentButton({ orderId, TotalAmount, ItemName }) {
  const onPayment = async () => {
    try {
      const response = await payment(orderId, TotalAmount, ItemName)
      console.log('Receive [get /ecpay/payment] response:', response.message)
      console.log('Receive [get /ecpay/payment] data:', response.ecPayParams)

      const { ecPayParams } = response

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = VITE_ECPAY_API

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
