// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { Trans, useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { useAuthStep } from '../../../context/AuthStepContext'
// 組件 (component)
import Icon from '../../../components/Icon'
import SubmitButton from '../../../components/SubmitButton'
import StepCard from '../../../components/StepCard'
import OtpForm from '../../../components/StepCard/OtpForm'

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
            {t('step.next')}
          </SubmitButton>
        </>}
    </StepCard>
  )
}

export default Step1
