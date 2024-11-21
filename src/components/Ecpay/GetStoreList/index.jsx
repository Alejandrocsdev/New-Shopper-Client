// 工具 (util)
import { ecpayForm } from '../../../utils/ecpayForm'
// 自訂函式 (custom function)
import { getStoreList } from '../../../api/request/ecpay'
// 環境變數
const { VITE_LOGISTICS_ECPAY_API } = import.meta.env

// 表單樣板: 密碼登入樣板 / 簡訊登入樣板 / 註冊樣板
function GetStoreList({ CvsType }) {
  const onGetList = async () => {
    try {
      const response = await getStoreList(CvsType)
      console.log('Receive [get /ecpay/store-list] response:', response.message)
      console.log('Receive [get /ecpay/store-list] data:', response.ecPayParams)

      const { ecPayParams } = response

      const action = `${VITE_LOGISTICS_ECPAY_API}/Helper/GetStoreList`

      ecpayForm(action, ecPayParams)
    } catch (error) {
      console.error('Catch [get /ecpay/payment] error:', error.message)
    }
  }

  return <button onClick={onGetList}>Get List</button>
}

export default GetStoreList
