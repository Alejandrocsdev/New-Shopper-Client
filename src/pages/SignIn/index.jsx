// 組件
import SignCard from '../../components/SignCard'
// 函式庫 (library)
import { useEffect } from 'react'
// 自訂函式 (custom function)
import { useAuthMode } from '../../context/AuthModeContext'

// 登入流程
function SignIn() {
  const { setMode } = useAuthMode()
  
  useEffect(() => {
    setMode('signIn')
  }, [])

  return <SignCard />
}

export default SignIn
