// 函式庫 (library)
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

// (1) Provider
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      return storedTheme === 'dark'
    }
    const htmlTag = document.documentElement.getAttribute('data-theme')
    localStorage.setItem('theme', htmlTag)
    // theme => boolan
    return htmlTag === 'dark'
  })
  console.log(isDark)

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev
      // boolan => theme
      localStorage.setItem('theme', newTheme ? 'dark' : 'light')
      return newTheme
    })
  }

  useEffect(() => {
    const rootElement = document.documentElement
    // boolan => theme
    rootElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}

// (2) Hook
export const useTheme = () => useContext(ThemeContext)
