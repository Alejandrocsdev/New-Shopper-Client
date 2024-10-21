// 組件
import SignCard from '../../components/SignCard'
// 函式庫 (library)
import { useEffect } from 'react'
// 自訂函式 (custom function)
import { useAuthMode } from '../../context/AuthModeContext'

// 註冊流程
function SignUp() {
  const { setMode } = useAuthMode()
  
  useEffect(() => {
    setMode('signUp')
  }, [])

  return <SignCard />
}

export default SignUp
