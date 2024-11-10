// 模組樣式 (module css)
import S from './style.module.css'
// 工具 (util)
import { ecpayForm } from '../../../utils/ecpayForm'
// 自訂函式 (custom function)
import { getPaymentOrder } from '../../../api/request/ecpay'
// 環境變數
const { VITE_PAYMENT_ECPAY_API } = import.meta.env

function GetPaymentOrder({ MerchantTradeNo }) {
  const onGetPaymentOrder = async () => {
    try {
      const response = await getPaymentOrder(MerchantTradeNo)
      console.log('Receive [get /ecpay/payment/order/params] response:', response.message)
      console.log('Receive [get /ecpay/payment/order/params] data:', response.ecPayParams)

      const { ecPayParams } = response

      const action = `${VITE_PAYMENT_ECPAY_API}/Cashier/QueryTradeInfo/V5`

      ecpayForm(action, ecPayParams)
    } catch (error) {
      console.error('Catch [get /ecpay/payment/order/params] error:', error.message)
    }
  }
  return <button onClick={onGetPaymentOrder}>Get Order</button>
}

export default GetPaymentOrder
