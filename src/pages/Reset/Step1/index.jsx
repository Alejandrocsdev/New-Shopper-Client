// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { useAuthStep } from '../../../context/AuthStepContext'
// 組件 (component)
import Icon from '../../../components/Element/Icon'
import SubmitButton from '../../../components/UI/Button/SubmitButton'
import StepCard from '../../../components/UI/Card/StepCard'
import OtpForm from '../../../components/UI/Card/StepCard/OtpForm'

function Step1() {
  const { t } = useTranslation()
  const { to, user } = useAuthStep()
  const { phone, email } = user

  return (
    <StepCard title={t('title.enterCode')} back>
      {phone && <OtpForm />}
      {email && <>
          <div className={S.iconContainer}>
            <Icon style={S.emailIcon} icon="faEnvelopeCircleCheck" />
          </div>
          <div className={S.text}>
            <span>{t('email.emailSentTo')}</span>
            <span className={S.email}>{email}</span>
          </div>
          <div className={S.text}>{t('email.pleaseVerify')}</div>
          {/* 執行下一步 */}
          <SubmitButton type="button" onClick={() => to('/sign-in')}>
            {t('success.backToSignIn')}
          </SubmitButton>
        </>}
    </StepCard>
  )
}

export default Step1
