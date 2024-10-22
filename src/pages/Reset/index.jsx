// 函式庫 (library)
import { useEffect } from 'react'
// 自訂函式 (custom function)
import { useAuthMode } from '../../context/AuthModeContext'
import { useAuthStep } from '../../context/AuthStepContext'
// 組件
import ResetStep from './ResetStep'
import Step1 from './Step1'
import Step2 from './Step2'

// 重設流程
function Reset() {
  const { step } = useAuthStep()
  const { setMode } = useAuthMode()

  useEffect(() => {
    setMode('reset')
  }, [])

  return (
    <>
      {/* 重設密碼頁面 */}
      {step === 0 && <ResetStep />}
      {/* OtpForm || 獨立: 信箱連結發送成功 */}
      {step === 1 && <Step1 />}
      {/* PasswordForm */}
      {step === 2 && <Step2 />}
    </>
  )
}

export default Reset
