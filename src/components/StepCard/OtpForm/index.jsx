// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { Trans, useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
// 自訂函式 (custom function)
import { sendOtp, verifyOtp } from '../../../api/request/verif'
import { findUserByInfo } from '../../../api/request/user'
// import { smsSignIn } from '../../../api/request/auth'
import { useAuthStep } from '../../../context/AuthStepContext'
import { useAuthMode } from '../../../context/AuthModeContext'
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

  const schema = Joi.object({
    otp: Joi.string().length(6).regex(/^\d+$/).required()
  })

  useEffect(() => {
    startCountdown()
  }, [])

  const handleResend = async () => {
    try {
      formContext.clearErrors('root')
      const response = await sendOtp(phone)
      console.log('Resend OTP Response:', response.message)
      startCountdown()
    } catch (error) {
      console.error(error.message)
      formContext.setError('root', { message: t(error.i18n) })
    }
  }

  const onSubmit = async (data) => {
    try {
      const { otp } = data
      console.log('Sent Data:', data)

      if (isSignUp) {
        const [otpResponse, userResponse] = await Promise.all([
          verifyOtp(phone, otp),
          findUserByInfo(`phone:${phone}`)
        ])
        console.log('Verify OTP Response:', otpResponse.message)
        console.log('Find User Response:', userResponse.message)
        if (userResponse.user) {
          const { id, username, avatar } = userResponse.user
          to(4, { id, username, avatar, phone })
        } else {
          to('+', { phone })
        }
      }
    } catch (error) {
      console.error(error.message)
      formContext.setError('root', { message: t(error.i18n) })
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
        {isCounting 
        ? <div>
            <Trans i18nKey="otpForm.counting" count={count} components={[<span key="0" />]} />
          </div>
        : <div className={S.resendText}>
            <span>{t('otpForm.otpNotReceived')}</span>{' '}
            <span onClick={handleResend}>{t('otpForm.resend')}</span>
          </div>}
      </div>
    </Form>
  )
}

export default OtpForm
