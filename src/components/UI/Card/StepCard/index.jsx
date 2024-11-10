// 模組樣式 (module css)
import S from './style.module.css'
// 組件 (component)
import Icon from '../../../Element/Icon'
import StepsView from './StepsView'
// 自訂函式
import { useAuthStep } from '../../../../context/AuthStepContext'

function StepCard({ title, steps, back = false, children }) {
  const { to } = useAuthStep()

  return (
    <div className={S.main}>
      {steps && <StepsView />}
      <div className={S.card}>
        <div className={S.cardHeader}>
          {back && (
            <div className={S.back} onClick={() => to(back === true ? '-' : back)}>
              <Icon icon="faArrowLeftLong" />
            </div>
          )}
          <div className={S.cardName}>{title}</div>
        </div>
        <div className={S.cardMain}>{children}</div>
      </div>
    </div>
  )
}

export default StepCard
