// 函式庫 (library)
import { createContext, useState, useContext } from 'react'

const ErrorContext = createContext()

// (1) Provider
export const ErrorProvider = ({ children }) => {
  const [errMsg, setErrMsg] = useState('')

  return <ErrorContext.Provider value={{ errMsg, setErrMsg }}>{children}</ErrorContext.Provider>
}

// (2) Hook
export const useError = () => useContext(ErrorContext)
