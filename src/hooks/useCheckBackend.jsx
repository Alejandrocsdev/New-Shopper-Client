// 函式庫 (library)
import { useEffect } from 'react'
// 工具 (util)
import { backPublicUrl } from '../utils/url'

// 檢測後端連線
function useCheckBackend(setLoading) {
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(backPublicUrl)
        const data = await response.json()
        if (data.status === 'ok') {
          setLoading(false)
        }
      } catch (error) {
        console.error('與後端連線失敗:', error)
      }
    }

    checkBackend()

    const interval = setInterval(() => {
      checkBackend()
    }, 5000)

    return () => clearInterval(interval)
  }, [])
}

export default useCheckBackend
