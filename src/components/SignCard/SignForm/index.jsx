// 模組樣式
import S from './style.module.css'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
// 組件 (component)
import Form from '../../Form'
import Input from '../../Input'

// 表單: 密碼登入 / 簡訊登入 / 註冊
const SignForm = () => {
  const { t } = useTranslation()

  const [formContext, setFormContext] = useState(null)

  const isSignUp = true
  const isSignIn = false
  const isPwdSignIn = false
  const isSmsSignIn = false

  const onSubmit = async (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.error(error.message)
      formContext.setError('root', { message: t(error.i18n) })
    }
  }

  return (
    <Form submitText={t(isSignIn ? 'sign.signIn' : 'sign.signUp')} onSubmit={onSubmit}>
      <Input name="signInKey" placeholder={t('signForm.phoneUserEmail')} errMsg={t('signForm.fillInput')}/>
    </Form>
  )
}

export default SignForm
