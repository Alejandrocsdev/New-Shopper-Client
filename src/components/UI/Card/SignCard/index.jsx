// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
import { Trans, useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { useAuthMode } from '../../../../context/AuthModeContext'
// 組件 (component)
import Logo from '../../Logo'
import Anchor from '../../../Element/Anchor'
import SignForm from './SignForm'
import ThirdPartySign from './ThirdPartySign'

// 表單樣板: 密碼登入樣板 / 簡訊登入樣板 / 註冊樣板
function SignCard() {
  const { t } = useTranslation()

  const { modeStates, toggleSmsSignIn } = useAuthMode()
  const { isSignUp, isSignIn, isPwdSignIn, isSmsSignIn } = modeStates

  return (
    <div className={S.main}>
      {/* Logo */}
      <Logo style={S.logo} shape="square" text unlink />

      {/* Card */}
      <div className={S.card}>
        {/* 標題 */}
        <h1 className={S.cardName}>{t(isSignUp ? 'sign.signUp' : 'sign.signIn')}</h1>

        {/* 表單 */}
        <SignForm />

        {/* 幫助 */}
        <div className={S.help}>
          <Anchor style={S.link} int="/reset">
            {t(isSignIn ? 'signCard.forgotPwd' : '')}
          </Anchor>
          {isSignIn && (
            <div className={S.link} onClick={toggleSmsSignIn}>
              {t(isPwdSignIn ? 'signCard.smsSignIn' : 'signCard.pwdSignIn')}
            </div>
          )}
        </div>

        {/* 分隔線 */}
        <div className={`${S.breakLine} ${isSmsSignIn ? S.adjust : ''}`}>
          <div className={S.line}></div>
          <div className={S.or}>{t('signCard.or')}</div>
          <div className={S.line}></div>
        </div>

        {/* 第三方登入/註冊 */}
        <ThirdPartySign />

        {/* 條款與政策 */}
        {isSignUp && <div className={S.policy}>
          <Trans i18nKey="signCard.agreement" components={[<span className={S.link} />]} />
        </div>}

        {/* 切換 */}
        <div className={S.switch}>
          <span className={S.text}>
            {t(isSignUp ? 'signCard.alreadyHaveAnAccount?' : 'signCard.newToShopper?')}
          </span>
          {/* 返回註冊頁及返回步驟0 */}
          <Anchor style={S.link} int={isSignUp ? '/sign-in' : '/sign-up'}>
            {t(isSignUp ? 'sign.signIn' : 'sign.signUp')}
          </Anchor>
        </div>
      </div>
    </div>
  )
}

export default SignCard
