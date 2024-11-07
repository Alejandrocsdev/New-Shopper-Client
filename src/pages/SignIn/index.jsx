// 函式庫 (library)
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// 自訂函式 (custom function)
import { useAuthMode } from '../../context/AuthModeContext'
import { useAuthStep } from '../../context/AuthStepContext'
import { useError } from '../../context/ErrorContext'
// 組件
import SignCard from '../../components/SignCard'
import Step1 from './Step1'

// 登入流程
function SignIn() {
  const { step } = useAuthStep()
  const { setMode } = useAuthMode()

  const location = useLocation()
  const { setErrMsg } = useError()
  
  useEffect(() => {
    setMode('signIn')
  }, [])
  console.log('location.state?.errMsg', location.state?.errMsg)
  useEffect(() => {
    if (location.state?.errMsg) {
      setErrMsg(location.state.errMsg)
    }
  }, [location.state, setErrMsg])

  return (
    <>
      {/* 登入頁面 */}
      {step === 0 && <SignCard />}
      {step === 1 && <Step1 />}
    </>
  )
}

export default SignIn
