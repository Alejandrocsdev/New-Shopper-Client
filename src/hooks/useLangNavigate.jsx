// 函式庫 (library)
import { useNavigate } from 'react-router-dom'
// 自訂函式 (custom function)
import { useLang } from '../context/LangContext'

const useLangNavigate = () => {
  const navigate = useNavigate()
  const { lang } = useLang()

  const langNavigate = (path, options) => {
    const prefixedPath = `/${lang}${path}`
    navigate(prefixedPath, options)
  }

  return langNavigate
}

export default useLangNavigate
