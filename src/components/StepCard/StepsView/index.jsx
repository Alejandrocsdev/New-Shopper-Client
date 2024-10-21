// 模組樣式
import S from './style.module.css'
// 組件 (component)
import Icon from '../../../components/Icon'
// 自訂函式 (custom function)
import { useAuthStep } from '../../../context/AuthStepContext'

function StepsView() {
  const { step } = useAuthStep()
  const stepState = (currentStep) => currentStep <= step

  return (
    <div className={S.steps}>
      {/* 步驟1 */}
      <div className={S.step}>
        <div className={`${S.circle} ${stepState(1) ? S.bgOn : ''}`}>1</div>
        <div className={`${S.circleText} ${stepState(1) ? S.colorOn : ''}`}>驗證電話號碼</div>
      </div>
      <div className={`${S.arrow} ${stepState(2) ? S.colorOn : ''}`}>
        <Icon icon='faArrowRightLong' />
      </div>
      {/* 步驟2 */}
      <div className={S.step}>
        <div className={`${S.circle} ${stepState(2) ? S.bgOn : ''}`}>2</div>
        <div className={`${S.circleText} ${stepState(2) ? S.colorOn : ''}`}>設定密碼</div>
      </div>
      <div className={`${S.arrow} ${stepState(3) ? S.colorOn : ''}`}>
        <Icon icon='faArrowRightLong' />
      </div>
      {/* 步驟3 */}
      <div className={S.step}>
        <div className={`${S.circle} ${stepState(3) ? S.bgOn : ''}`}>
          <Icon style={S.checkIcon} icon='faCheck' />
        </div>
        <div className={`${S.circleText} ${stepState(3) ? S.colorOn : ''}`}>完成</div>
      </div>
    </div>
  )
}

export default StepsView
