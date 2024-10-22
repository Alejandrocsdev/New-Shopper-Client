// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 組件 (component)
import StepCard from '../../../components/StepCard'
import Success from '../../../components/StepCard/Success'

function Step3() {
  const { t } = useTranslation()

  return (
    <StepCard title={t('title.signUpSuccess')} steps>
      <Success />
    </StepCard>
  )
}

export default Step3
