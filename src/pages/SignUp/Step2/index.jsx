// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 組件 (component)
import StepCard from '../../../components/UI/Card/StepCard'
import PasswordForm from '../../../components/UI/Card/StepCard/PasswordForm'

function Step2() {
  const { t } = useTranslation()

  return (
    <StepCard title={t('title.setPassword')} steps>
      <PasswordForm />
    </StepCard>
  )
}

export default Step2
