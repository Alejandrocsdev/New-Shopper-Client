// 函式庫 (library)
import { useEffect } from 'react'

// 監聽事件: 點擊外部
function useClickOutside(ref, handler) {
  useEffect(() => {
    const handleClickOutside = event => {
      if (!ref.current.contains(event.target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
}

export default useClickOutside
