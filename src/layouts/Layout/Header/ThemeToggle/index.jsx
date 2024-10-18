// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useEffect } from 'react'
// 組件 (component)
import Icon from '../../../../components/Icon'

// 主題切換
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => setIsDark(!isDark)

  useEffect(() => {
    const rootElement = document.documentElement
    rootElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <button className={S.themeToggle} onClick={toggleTheme}>
      <Icon style={`${S.circleHalfStroke} ${isDark ? S.rotate : ''}`} icon="faCircleHalfStroke" />
    </button>
  )
}

export default ThemeToggle
