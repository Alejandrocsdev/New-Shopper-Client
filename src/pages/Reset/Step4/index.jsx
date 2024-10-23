// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { useAuthStep } from '../../../context/AuthStepContext'
import useCountdown from '../../../hooks/useCountdown'
// 組件 (component)
import Icon from '../../../components/Icon'
import SubmitButton from '../../../components/SubmitButton'
import StepCard from '../../../components/StepCard'

function Step4() {
  const { t } = useTranslation()
  const { count, startCountdown } = useCountdown(10, () => to('/sign-in'), { once: true })
  const { to, user } = useAuthStep()
  const { message } = user

  useEffect(() => {
    startCountdown()
  }, [])

  return (
    <StepCard title={t('title.resetFail')}>
      <div className={S.iconContainer}>
        <Icon style={S.failureIcon} icon="faCircleXmark" />
      </div>

      <div className={S.cardText}>
        <div className={S.errMsg}>{t(`error.${message}`)}</div>
        <div className={S.text}>
          <Trans
            i18nKey="emailError.redirectMessage"
            count={count}
            components={[<span className={S.count} />]}
          />
        </div>
      </div>
      {/* 執行下一步 */}
      <SubmitButton type="button" onClick={() => to('/sign-in')}>
        {t('emailError.backToSignIn')}
      </SubmitButton>
    </StepCard>
  )
}

export default Step4
