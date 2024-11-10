// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { signUp, signOut } from '../../../../../api/request/auth'
import { putPwdByInfo } from '../../../../../api/request/user'
import { useAuthStep } from '../../../../../context/AuthStepContext'
import { useAuthMode } from '../../../../../context/AuthModeContext'
// 組件 (component)
import Icon from '../../../../Element/Icon'
import PasswordInput from '../../../../Element/Input/PasswordInput'
import Form from '../../../../Element/Form'

function PasswordForm() {
  const { t } = useTranslation()
  const { user, to } = useAuthStep()
  const { isSignUp, isReset } = useAuthMode().modeStates

  const [formContext, setFormContext] = useState(null)

  const { phone, email } = user

  const schema = Joi.object({
    password: Joi.string().min(8).max(16).regex(/[a-z]/).regex(/[A-Z]/).regex(/\d/).required()
  })

  const onSubmit = async (data) => {
    try {
      const { password } = data
      console.log('Sent form data:', data)

      if (isSignUp) {
        const response = await signUp(phone, password)
        console.log('Receive [post /auth/sign-up] response:', response.message)
        
        const { id } = response.user
        to('+', { id, phone })
      } else if (isReset) {
        const userInfo = phone ? `phone:${phone}` : `email:${email}`

        const resetResponse = await putPwdByInfo(userInfo, password)
        console.log('Receive [put /user/pwd/:userInfo] response:', resetResponse.message)

        const signOutResponse = await signOut()
        console.log('Receive [post /auth/sign-out] response:', signOutResponse.message)

        to('+', phone ? { phone } : { email })
      }
    } catch (error) {
      console.error(`Catch ${error.endpoint} error:`,error.message)
      formContext.setError('root', { message: t(error.i18n) })
    }
  }

  return (
    <Form
      schema={schema}
      submitText={t(isSignUp ? 'sign.signUp' : 'sign.reset')}
      onSubmit={onSubmit}
      setFormContext={setFormContext}
    >
      {/* 表單文字 */}
      <div className={S.cardText}>
        <div className={S.text}>{t(isSignUp ? 'passwordForm.signUp' : 'passwordForm.reset')}</div>
        {isReset && <div className={S.method}>{phone || email}</div>}
      </div>

      {/* 密碼輸入欄 (含條件) */}
      <PasswordInput name="password" criteria />
    </Form>
  )
}

export default PasswordForm
