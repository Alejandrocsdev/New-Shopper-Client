// 函式庫 (library)
import { useEffect } from 'react'
// 工具 (util)
import { backPublicUrl } from '../utils/url'

// 檢測後端連線
function useCheckBackend(setLoading) {
  useEffect(() => {
    const checkBackend = async () => {
      setLoading(true)
      try {
        const response = await fetch(backPublicUrl)
        const data = await response.json()
        if (data.status === 'ok') {
          setLoading(false)
        }
      } catch (error) {
        console.error('與後端連線失敗:', error)
      } finally {
        setLoading(false)
      }
    }

    checkBackend()
  }, [])
}

export default useCheckBackend
