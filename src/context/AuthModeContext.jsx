// 函式庫 (library)
import { createContext, useContext, useState } from 'react'

const AuthModeContext = createContext()

// (1) Provider
export const AuthModeProvider = ({ children }) => {
  const [mode, setMode] = useState(null)

  const [isSmsSignIn, setIsSmsSignIn] = useState(false)
  const toggleSmsSignIn = () => setIsSmsSignIn(!isSmsSignIn)

  const isSignIn = mode === 'signIn'
  const isSignUp = mode === 'signUp'
  const isReset = mode === 'reset'

  const modeStates = {
    isSignIn,
    isPwdSignIn: isSignIn && !isSmsSignIn,
    isSmsSignIn: isSignIn && isSmsSignIn,
    isSignUp,
    isReset
  }

  // debug
  switch (true) {
    case modeStates.isPwdSignIn:
      console.log('pwdSignIn')
      break
    case modeStates.isSmsSignIn:
      console.log('smsSignIn')
      break
    case modeStates.isSignUp:
      console.log('signUp')
      break
    case modeStates.isReset:
      console.log('reset')
      break
  }

  return (
    <AuthModeContext.Provider value={{ mode, setMode, modeStates, toggleSmsSignIn }}>
      {children}
    </AuthModeContext.Provider>
  )
}

// (2) Hook
export const useAuthMode = () => useContext(AuthModeContext)
