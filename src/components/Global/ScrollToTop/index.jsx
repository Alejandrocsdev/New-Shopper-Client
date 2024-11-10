// 函式庫 (library)
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 導向置頂
const ScrollToTop = () => {
  const { pathname, key } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, key])

  return null
}

export default ScrollToTop
