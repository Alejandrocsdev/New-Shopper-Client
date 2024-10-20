// 模組樣式
import S from './style.module.css'
import { useTranslation } from 'react-i18next'
// 組件 (component)
import Form from '../../Form'

// 表單: 密碼登入 / 簡訊登入 / 註冊
const SignForm = () => {
  const { t } = useTranslation()

  const isSignUp = true
  const isSignIn = false
  const isPwdSignIn = false
  const isSmsSignIn = false

  const onSubmit = async (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  return <Form submitText={t(isSignIn ? 'sign.signIn' : 'sign.signUp')} onSubmit={onSubmit}></Form>
}

export default SignForm
