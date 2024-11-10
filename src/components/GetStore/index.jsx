// 模組樣式 (module css)
import S from './style.module.css'
// 工具 (util)
import { ecpayForm } from '../../utils/ecpayForm'
// 自訂函式 (custom function)
// 自訂函式 (custom function)
import useRedux from '../../hooks/useRedux'
import { useLang } from '../../context/LangContext'
import { getStore } from '../../api/request/ecpay'
// 環境變數
const { VITE_LOGISTICS_ECPAY_API } = import.meta.env
// 圖檔 (image)
import sevenElevenPng from '../../assets/img/ecpay/sevenEleven.png'
import familyMartPng from '../../assets/img/ecpay/familyMart.png'
import okMartPng from '../../assets/img/ecpay/okMart.png'

// 表單樣板: 密碼登入樣板 / 簡訊登入樣板 / 註冊樣板
function GetStore() {
  const { setAuth, user } = useRedux()
  const { lang } = useLang()
  const id = user?.id

  const onGetStore = async (LogisticsSubType) => {
    try {
      const path = `/${lang}/profile/address`
      const response = await getStore(id, LogisticsSubType, path)
      console.log('Receive [get /ecpay/express-map] response:', response.message)
      console.log('Receive [get /ecpay/express-map] data:', response.ecPayParams)

      const { ecPayParams } = response

      const action = `${VITE_LOGISTICS_ECPAY_API}/Express/map`

      ecpayForm(action, ecPayParams)
    } catch (error) {
      console.error('Catch [get /ecpay/payment] error:', error.message)
    }
  }

  return (
    <div className={S.expressMap}>
      <div className={S.addBtn}>+ 新增超商地址</div>
      <div className={S.stores}>
        <img className={S.image} src={sevenElevenPng} onClick={() => onGetStore('UNIMARTC2C')} />
        <img className={S.image} src={familyMartPng} onClick={() => onGetStore('FAMIC2C')} />
        <img className={S.image} src={okMartPng} onClick={() => onGetStore('OKMARTC2C')} />
      </div>
    </div>
  )
}

export default GetStore
