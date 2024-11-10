// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 組件 (component)
import StepCard from '../../../components/UI/Card/StepCard'
import OtpForm from '../../../components/UI/Card/StepCard/OtpForm'

function Step1() {
  const { t } = useTranslation()

  return (
    <StepCard title={t('title.enterCode')} back steps>
      <OtpForm />
    </StepCard>
  )
}

export default Step1
