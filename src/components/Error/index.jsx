// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { useError } from '../../context/ErrorContext'

// 全域錯誤訊息
function Error() {
  const { t } = useTranslation()
  const { errMsg, setErrMsg  } = useError()
  const location = useLocation()

  // 顯示五秒後移除
  useEffect(() => {
    if (errMsg) {
      const timer = setTimeout(() => {
        setErrMsg('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [errMsg, setErrMsg])

  // 導向其他頁面後後移除
  useEffect(() => {
    setErrMsg('')
  }, [location.pathname, setErrMsg])

  if (!errMsg) {
    return null
  }

  return <div className={S.error}>{t(errMsg)}</div>
}

export default Error
