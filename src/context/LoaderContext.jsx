// 函式庫 (library)
import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { backPublicUrl } from '../utils/url'

const LoaderContext = createContext()

// (1) Provider
export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  // 初始後端連線
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(backPublicUrl)
        const data = await response.json()
        if (data.status === 'ok') {
          setIsLoading(false)
          clearInterval(interval)
        }
      } catch (error) {
        console.error('與後端連線失敗:', error)
      }
    }

    checkBackend()
    const interval = setInterval(checkBackend, 5000)
    return () => clearInterval(interval)
  }, [])

  // 切換路徑載入
  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [location])

  return (
    <LoaderContext.Provider value={{ isLoading }}>
      {children}
    </LoaderContext.Provider>
  )
}

// (2) Hook
export const useLoader = () => useContext(LoaderContext)