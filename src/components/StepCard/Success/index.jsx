// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
// 自訂函式
import { autoSignIn } from '../../../api/request/auth'
import { resetPwdPhone, resetPwdEmail } from '../../../api/request/notif'
import { useAuthStep } from '../../../context/AuthStepContext'
import { useAuthMode } from '../../../context/AuthModeContext'
import { useError } from '../../../context/ErrorContext'
import { useAuth } from '../../../context/AuthContext'
import useCountdown from '../../../hooks/useCountdown'
// 組件
import Icon from '../../Icon'
import SubmitButton from '../../SubmitButton'

// 成功頁面: 註冊 / 重設密碼
function Success() {
  const { t } = useTranslation()
  const { user, to } = useAuthStep()
  const { isSignUp, isReset } = useAuthMode().modeStates
  const { count, startCountdown } = useCountdown(10, onRedirect, { once: true })
  const { id, phone, email } = user
  const { setErrMsg } = useError()
  const { setAuth } = useAuth()

  useEffect(() => {
    startCountdown()
  }, [])

  async function onRedirect() {
    if (isSignUp) {
      try {
        const response = await autoSignIn(id)
        console.log('Auto Sign In Response:', response.message)
        setAuth({ accessToken: response.accessToken })
        to('/')
      } catch (err) {
        console.error(err.message)
        setErrMsg(err.i18n)
      }
    } else if (isReset && phone) {
      const response = await resetPwdPhone(phone)
      console.log('Phone Notification Response:', response.message)
      to('/sign-in')
    } else if (isReset && email) {
      const response = await resetPwdEmail(email)
      console.log('Email Notification Response:', response.message)
      to('/sign-in')
    }
  }

  return (
    <>
      <div className={S.successIcon}>
        <Icon icon="faCircleCheck" />
      </div>
      <div className={S.cardText}>
        <div className={S.text}>
          <Trans
            i18nKey="success.successMessage"
            values={{
              method: t(phone ? 'success.phone' : 'success.email'),
              data: phone || email,
              action: t(isSignUp ? 'success.signUp' : 'success.resetPassword')
            }}
            components={[<span className={S.method} key="0" />, <div key="1" />]}
          />
        </div>
        <div className={S.text}>
          <Trans
            i18nKey="success.redirectMessage"
            count={count}
            values={{ page: t(isSignUp ? 'success.home' : 'success.signIn') }}
            components={[<span className={S.count} />]}
          />
        </div>
      </div>
      <SubmitButton type="button" onClick={onRedirect}>
        {t(isSignUp ? 'success.backToHome' : 'success.backToSignIn')}
      </SubmitButton>
    </>
  )
}

export default Success
