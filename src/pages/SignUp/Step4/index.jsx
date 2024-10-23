// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { autoSignIn } from '../../../api/request/auth'
import { useAuthStep } from '../../../context/AuthStepContext'
import { useError } from '../../../context/ErrorContext'
// 組件 (component)
import StepCard from '../../../components/StepCard'
import SubmitButton from '../../../components/SubmitButton'
// 圖檔
import avatarPng from '../../../assets/img/default/avatar.png'

function Step4() {
  const { t } = useTranslation()
  const { user, to } = useAuthStep()
  const { id, username, avatar, phone } = user
  const { setErrMsg } = useError()

  // 處理表單提交事件
  const onAutoSignIn = async () => {
    try {
      const response = await autoSignIn(id)
      console.log('Response:', response.message)

      console.log('Access Token:', response.accessToken)

      to('/')
    } catch (err) {
      console.error(err.message)
      setErrMsg(t(err.i18n))
    }
  }

  return (
    <StepCard title={t('title.isYourAccount?')}>
      <div className={S.avatarContainer}>
        <img className={S.avatar} src={avatar || avatarPng} />
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
