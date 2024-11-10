// 模組樣式 (module css)
import S from './style.module.css'
// 工具 (utils)
import { backUrl } from '../../../../../utils/url'
// 圖檔 (image)
import facebookPng from '../../../../../assets/img/thirdParty/facebook.png'
import googlePng from '../../../../../assets/img/thirdParty/google.png'
// 組件 (component)
import Anchor from '../../../../Element/Anchor'

// 第三方 登入 / 註冊
const ThirdPartySign = () => {
  return (
    <div className={S.thirdParty}>
      <Anchor style={S.button} ext={`${backUrl}/auth/sign-in/facebook`} target="_self">
        <img className={S.logo} src={facebookPng} />
        <div className={S.text}>Facebook</div>
      </Anchor>
      <Anchor style={S.button} ext={`${backUrl}/auth/sign-in/gmail`} target="_self">
        <img className={S.logo} src={googlePng} />
        <div className={S.text}>Google</div>
      </Anchor>
    </div>
  )
}

export default ThirdPartySign
