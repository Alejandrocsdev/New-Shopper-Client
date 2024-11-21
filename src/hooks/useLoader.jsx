// 函式庫 (library)
import { useState, useEffect } from 'react'
// 工具 (util)
import { backPublicUrl } from '../utils/url.mjs'

function useLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(backPublicUrl)
        const data = await response.json()
        if (data.status === 'ok') {
          setLoading(false)
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

  return loading
}

export default useLoader
