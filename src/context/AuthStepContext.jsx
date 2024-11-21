// 函式庫 (library)
import { createContext, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
// 自訂函式 (custom function)
import useLangNavigate from '../hooks/useLangNavigate'

const AuthStepContext = createContext()

// (1) Provider
export const AuthStepProvider = ({ children }) => {
  const [step, setStep] = useState(0)
  const [user, setUser] = useState({})
  const location = useLocation()
  const langNavigate = useLangNavigate()

  const to = (step, user = {}) => {
    if (Number.isInteger(step)) {
      setStep(step)
    } else if (step === '+') {
      setStep(prevStep => prevStep + 1)
    } else if (step === '-') {
      setStep(prevStep => prevStep - 1)
    } else if (step === 'sign-in') {
      const from = location.state?.from?.pathname
      langNavigate(from || '/', { replace: true })
      setStep(0)
    } else if (step.startsWith('/')) {
      langNavigate(step)
      setStep(0)
    }

    if (typeof user === 'object' && Object.keys(user).length > 0) {
      setUser(user)
    }
  }

  return <AuthStepContext.Provider value={{ step, user, to }}>{children}</AuthStepContext.Provider>
}

// (2) Hook
export const useAuthStep = () => useContext(AuthStepContext)
