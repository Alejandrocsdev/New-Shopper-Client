// 函式庫 (library)
import { createContext, useState, useContext } from 'react'

const MessageContext = createContext()

// (1) Provider
export const MessageProvider = ({ children }) => {
  const [errMsg, setErrMsg] = useState('')
  const [sucMsg, setSucMsg] = useState('')

  return <MessageContext.Provider value={{ errMsg, setErrMsg, sucMsg, setSucMsg }}>{children}</MessageContext.Provider>
}

// (2) Hook
export const useMessage = () => useContext(MessageContext)
