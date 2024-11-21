// 函式庫 (library)
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
// 自訂函式 (custom function)
import { sendOtp } from '../../../../../api/request/verif'
import { pwdSignIn } from '../../../../../api/request/auth'
import { useAuthStep } from '../../../../../context/AuthStepContext'
import { useAuthMode } from '../../../../../context/AuthModeContext'
import { useMessage } from '../../../../../context/MessageContext'
import useRedux from '../../../../../hooks/useRedux'
// 組件 (component)
import Form from '../../../../Element/Form'
import Input from '../../../../Element/Input'
import PasswordInput from '../../../../Element/Input/PasswordInput'
import PhoneInput from '../../../../Element/Input/PhoneInput'

// 表單: 密碼登入 / 簡訊登入 / 註冊
const SignForm = () => {
  const { t } = useTranslation()
  const { to } = useAuthStep()
  const { setErrMsg } = useMessage()
  const { setAuth, clearAuth } = useRedux()

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
  }, [isSignIn, isPwdSignIn, isSmsSignIn])

  const onSubmit = async data => {
    const { signInKey, password, phone } = data
    console.log('Sent form data:', data)

    try {
      if (isSignUp || isSmsSignIn) {
        const response = await sendOtp(phone, 'phone')
        console.log('Receive [post /verif/send/otp] response:', response.message)

        to('+', { phone })
      } else if (isPwdSignIn) {
        const response = await pwdSignIn(signInKey, password)
        console.log('Receive [post /auth/sign-in/pwd] response:', response.message)
        console.log('Receive [post /auth/sign-in/pwd] data:', response.accessToken)

        setAuth({ token: response.accessToken })
        to('sign-in')
      }
    } catch (error) {
      console.error(`Catch ${error.endpoint} error:`, error.message)
      if (isPwdSignIn) {
        setErrMsg(error.i18n)
        clearAuth()
      } else {
        formContext.setError('root', { message: t(error.i18n) })
      }
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
      {isPwdSignIn && <Input name="signInKey" placeholder={t('input.phoneUserEmail')} errMsg={t('input.fillInput')} />}

      {/* password */}
      {isPwdSignIn && <PasswordInput name="password" />}

      {/* phone */}
      {(isSignUp || isSmsSignIn) && <PhoneInput name="phone" />}
    </Form>
  )
}

export default SignForm
