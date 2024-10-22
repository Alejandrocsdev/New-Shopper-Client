// 模組樣式
import S from './style.module.css'
// 自訂函式 (custom function)
import { sendOtp } from '../../../api/request/verif'
import { pwdSignIn } from '../../../api/request/auth'
import { useAuthStep } from '../../../context/AuthStepContext'
// 函式庫 (library)
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
// 自訂函式 (custom function)
import { useAuthMode } from '../../../context/AuthModeContext'
// 組件 (component)
import Form from '../../Form'
import Input from '../../Input'
import PasswordInput from '../../Input/PasswordInput'
import PhoneInput from '../../Input/PhoneInput'

// 表單: 密碼登入 / 簡訊登入 / 註冊
const SignForm = () => {
  const { t } = useTranslation()
  const { to } = useAuthStep()

  const [formContext, setFormContext] = useState(null)

  const { isSignUp, isSignIn, isPwdSignIn, isSmsSignIn } = useAuthMode().modeStates

  const pwdSchema = Joi.object({
    signInKey: Joi.string().required(),
    password: Joi.string().required()
  })

  const smsSchema = Joi.object({
    phone: Joi.string().regex(/^09/).length(10).required()
  })

  useEffect(() => {
    const reset = formContext?.reset
    if (reset) reset()
  }, [isSignUp, isPwdSignIn, isSmsSignIn])

  const onSubmit = async (data) => {
    const { signInKey, password, phone } = data
    console.log('Sent Data:', data)

    try {
      if (isSignUp || isSmsSignIn) {
        const response = await sendOtp(phone)
        console.log('Send OTP Response:', response.message)
        to('+', { phone })
      } else if (isPwdSignIn) {
        const response = await pwdSignIn(signInKey, password)
        console.log('Password Sign In Response:', response.message)

        console.log('Access Token', response.accessToken)

        to('/')
      }
    } catch (error) {
      console.error(error.message)
      formContext.setError('root', { message: t(error.i18n) })
    }
  }

  return (
    <Form
      schema={isPwdSignIn ? pwdSchema : smsSchema}
      onSubmit={onSubmit}
      submitText={t(isSignIn ? 'sign.signIn' : 'sign.signUp')}
      setFormContext={setFormContext}
    >
      {/* signInKey */}
      {isPwdSignIn && (
        <Input
          name="signInKey"
          placeholder={t('input.phoneUserEmail')}
          errMsg={t('input.fillInput')}
          maxLength="16"
        />
      )}

      {/* password */}
      {isPwdSignIn && <PasswordInput name="password" />}

      {/* phone */}
      {(isSignUp || isSmsSignIn) && <PhoneInput name="phone" />}
    </Form>
  )
}

export default SignForm
