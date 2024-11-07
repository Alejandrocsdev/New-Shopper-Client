// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { Trans, useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
// 自訂函式 (custom function)
import { sendOtp, verifyOtp } from '../../../api/request/verif'
import { findUserByInfo } from '../../../api/request/user'
import { smsSignIn } from '../../../api/request/auth'
import { useAuthStep } from '../../../context/AuthStepContext'
import { useAuthMode } from '../../../context/AuthModeContext'
import { useMessage } from '../../../context/MessageContext'
import useRedux from '../../../hooks/useRedux'
import useCountdown from '../../../hooks/useCountdown'
// 組件 (component)
import OtpInput from './OtpInput'
import Form from '../../Form'

function OtpForm() {
  const { t } = useTranslation()
  const { user, to } = useAuthStep()
  const { isSmsSignIn, isSignUp, isReset } = useAuthMode().modeStates
  const { count, isCounting, startCountdown } = useCountdown(60)
  const [formContext, setFormContext] = useState(null)
  const { phone } = user
  const { setErrMsg } = useMessage()
  const { setAuth, clearAuth } = useRedux()

  const schema = Joi.object({
    otp: Joi.string().length(6).regex(/^\d+$/).required()
  })

  useEffect(() => {
    startCountdown()
  }, [])

  const onResend = async () => {
    try {
      formContext.clearErrors('root')

      const response = await sendOtp(phone, 'phone')
      console.log('Receive [post /verif/send/otp] Response:', response.message)

      startCountdown()
    } catch (error) {
      console.error(error.message)
      formContext.setError('root', { message: t(error.i18n) })
    }
  }

  const onSubmit = async (data) => {
    try {
      const { otp } = data
      console.log('Sent form data:', data)

      if (isSignUp) {
        const [otpResponse, userResponse] = await Promise.all([
          verifyOtp(phone, 'phone', otp),
          findUserByInfo(`phone:${phone}`)
        ])
        console.log('Receive [post /verif/verify/otp] response:', otpResponse.message)
        console.log('Receive [get /user/find/:userInfo] response:', userResponse.message)

        if (userResponse.user) {
          const { id, username, avatar } = userResponse.user
          to(4, { id, username, avatar: avatar.link, phone })
        } else {
          to('+', { phone })
        }
      } else if (isSmsSignIn) {
        const response = await smsSignIn(phone, otp)
        console.log('Receive [post /auth/sign-in/sms] response:', response.message)
        console.log('Receive [post /auth/sign-in/sms] data:', userResponse.accessToken)

        setAuth({ token: response.accessToken })
        to('sign-in')
      } else if (isReset) {
        const response = await verifyOtp(phone, 'phone', otp)
        console.log('Receive [post /verif/verify/otp] response:', response.message)

        to('+', { phone })
      }
    } catch (error) {
      console.error(`Catch ${error.endpoint} error:`, error.message)
      if (isSmsSignIn) {
        setErrMsg(error.i18n)
        clearAuth()
      } else {
        formContext.setError('root', { message: t(error.i18n) })
      }
    }
  }

  return (
    <Form
      schema={schema}
      submitText={t('step.next')}
      onSubmit={onSubmit}
      setFormContext={setFormContext}
    >
      {/* 表單文字 */}
      <div className={S.cardText}>
        <div className={S.text}>{t('otpForm.otpSent')}</div>
        <div className={S.phone}>{phone}</div>
      </div>

      {/* OTP輸入框 */}
      <OtpInput name="otp" />

      {/* OTP發送倒數 & 重新傳送 */}
      <div className={isCounting ? S.countdown : S.resend}>
        {isCounting ? (
          <div>
            <Trans i18nKey="otpForm.counting" count={count} components={[<span key="0" />]} />
          </div>
        ) : (
          <div className={S.resendText}>
            <span>{t('otpForm.otpNotReceived')}</span>{' '}
            <span onClick={onResend}>{t('otpForm.resend')}</span>
          </div>
        )}
      </div>
    </Form>
  )
}

export default OtpForm
