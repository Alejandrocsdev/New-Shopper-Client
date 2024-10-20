// 模組樣式
import S from './style.module.css'
// PNG 圖檔
import facebookPng from '../../../assets/img/thirdParty/facebook.png'
import googlePng from '../../../assets/img/thirdParty/google.png'

// 第三方 登入 / 註冊
const ThirdPartySign = () => {
  return (
    <div className={S.thirdParty}>
      <button className={S.button}>
        <img className={S.logo} src={facebookPng} />
        <div className={S.text}>Facebook</div>
      </button>
      <button className={S.button}>
        <img className={S.logo} src={googlePng} />
        <div className={S.text}>Google</div>
      </button>
    </div>
  )
}

export default ThirdPartySign
