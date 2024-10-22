// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 組件 (component)
import StepCard from '../../../components/StepCard'
import PasswordForm from '../../../components/StepCard/PasswordForm'

function Step2() {
  const { t } = useTranslation()

  return (
    <StepCard title={t('title.resetPassword')}>
      <PasswordForm />
    </StepCard>
  )
}

export default Step2
