// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { useAuthStep } from '../../../context/AuthStepContext'
// 組件 (component)
import StepCard from '../../../components/StepCard'
import OtpForm from '../../../components/StepCard/OtpForm'

function Step1() {
  const { t } = useTranslation()
  const { user } = useAuthStep()
  const { phone, email } = user

  return (
    <StepCard title={t('title.enterCode')} back>
      {phone && <OtpForm />}
      {email && <div></div>}
    </StepCard>
  )
}

export default Step1
