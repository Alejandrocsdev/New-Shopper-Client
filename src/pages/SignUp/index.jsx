// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'

// 註冊
function SignUp() {
  const { t } = useTranslation()

  return (
    <main className={S.main}>
      <div className={S.div}>{t('share.signUp')}</div>
    </main>
  )
}

export default SignUp
