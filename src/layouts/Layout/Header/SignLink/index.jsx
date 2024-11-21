// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 組件 (component)
import Anchor from '../../../../components/Element/Anchor'

// 登入／註冊 連結
function SignLink() {
  const { t } = useTranslation()

  return (
    <div className={S.signLink}>
      <Anchor style={S.signUp} int="/sign-up">
        {t('sign.signUp')}
      </Anchor>
      <Anchor style={S.signIn} int="/sign-in">
        {t('sign.signIn')}
      </Anchor>
    </div>
  )
}

export default SignLink
