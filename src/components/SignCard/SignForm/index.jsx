// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
// 組件 (component)
import Form from '../../Form'
import Input from '../../Input'
import PasswordInput from '../../Input/PasswordInput'
// import PhoneInput from '../../Input/PhoneInput'

// 表單: 密碼登入 / 簡訊登入 / 註冊
const SignForm = () => {
  const { t } = useTranslation()

  const [formContext, setFormContext] = useState(null)

  const isSignUp = true
  const isSignIn = false
  const isPwdSignIn = false
  const isSmsSignIn = false

  const schema = Joi.object({
    signInKey: Joi.string().required(),
    password: Joi.string().required()
  })

  const onSubmit = async (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.error(error.message)
      formContext.setError('root', { message: t(error.i18n) })
    }
  }

  return (
    <Form
      schema={schema}
      onSubmit={onSubmit}
      submitText={t(isSignIn ? 'sign.signIn' : 'sign.signUp')}
      setFormContext={setFormContext}
    >
      {/* signInKey */}
      {isPwdSignIn && (
        <Input
          name="signInKey"
          placeholder={t('signForm.phoneUserEmail')}
          errMsg={t('signForm.fillInput')}
          maxLength="16"
        />
      )}

      {/* password */}
      {isPwdSignIn && <PasswordInput name="password" />}

      {/* phone */}
      {/* {(isSignUp || isSmsSignIn) && <PhoneInput name="phone" />} */}
    </Form>
  )
}

export default SignForm
