// 函式庫 (library)
import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { backPublicUrl } from '../utils/url'

const LoaderContext = createContext()

// (1) Provider
export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const [backendReady, setBackendReady] = useState(false)

  // Backend check (only once initially and in intervals)
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(backPublicUrl)
        const data = await response.json()
        if (data.status === 'ok') {
          setBackendReady(true)
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

  // For page-specific data fetching, allow manual control of `isLoading`
  useEffect(() => {
    if (backendReady) {
      setIsLoading(true)
    }
  }, [location, backendReady])

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return (
    <LoaderContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoaderContext.Provider>
  )
}

// (2) Hook
export const useLoader = () => useContext(LoaderContext)
