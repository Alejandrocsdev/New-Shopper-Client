// 模組樣式
import S from './style.module.css'
// 工具 (utils)
import { publicAvatarSrc } from '../../../utils/avatarSrc'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { autoSignIn } from '../../../api/request/auth'
import { useAuthStep } from '../../../context/AuthStepContext'
import { useMessage } from '../../../context/MessageContext'
import useRedux from '../../../hooks/useRedux'
// 組件 (component)
import StepCard from '../../../components/UI/Card/StepCard'
import SubmitButton from '../../../components/UI/Button/SubmitButton'

function Step4() {
  const { t } = useTranslation()
  const { user, to } = useAuthStep()
  const { id, username, avatar, phone } = user
  const { setErrMsg } = useMessage()
  const { setAuth, clearAuth } = useRedux()

  // 處理表單提交事件
  const onAutoSignIn = async () => {
    try {
      const response = await autoSignIn(id)
      console.log('Receive [post /auth/sign-in/auto/:userId] response:', response.message)
      console.log('Receive [post /auth/sign-in/auto/:userId] data:', response.accessToken)
      setAuth({ token: response.accessToken })
      to('/')
    } catch (err) {
      console.error(err.message)
      setErrMsg(err.i18n)
      clearAuth()
    }
  }

  return (
    <StepCard title={t('title.isYourAccount?')}>
      <div className={S.avatarContainer}>
        <img className={S.avatar} src={publicAvatarSrc(avatar)} />
      </div>
      <div className={S.username}>{username}</div>
      <div className={S.phone}>{phone}</div>
      <div className={S.text}>{t('signedUp.text')}</div>
      {/* 登入 */}
      <SubmitButton type="button" onClick={onAutoSignIn}>
        {t('signedUp.yesSignIn')}
      </SubmitButton>
      {/* 返回註冊 */}
      <SubmitButton type="button" style={S.back} onClick={() => to(0)}>
        {t('signedUp.noReturn')}
      </SubmitButton>
    </StepCard>
  )
}

export default Step4
