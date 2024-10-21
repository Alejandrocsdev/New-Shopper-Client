// 函式庫 (library)
import { useEffect } from 'react'
// 自訂函式 (custom function)
import { useAuthMode } from '../../context/AuthModeContext'
import { useAuthStep } from '../../context/AuthStepContext'
// 組件
import SignCard from '../../components/SignCard'
// import Step1 from './Step1'

// 登入流程
function SignIn() {
  const { step } = useAuthStep()
  const { setMode } = useAuthMode()
  
  useEffect(() => {
    setMode('signIn')
  }, [])

  return (
    <>
      {/* 登入頁面 */}
      {step === 0 && <SignCard />}
      {/* {step === 1 && <Step1 />} */}
    </>
  )
}

export default SignIn
