// 函式庫 (library)
import { useEffect } from 'react'
// 自訂函式 (custom function)
import { useAuthMode } from '../../context/AuthModeContext'
import { useAuthStep } from '../../context/AuthStepContext'
// 組件
import ResetStep from './ResetStep'

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
    </>
  )
}

export default Reset
