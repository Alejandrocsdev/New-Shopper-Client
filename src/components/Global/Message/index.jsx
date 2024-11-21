// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { useMessage } from '../../../context/MessageContext'

// 全域錯誤訊息
function Message() {
  const { t } = useTranslation()
  const { errMsg, setErrMsg, sucMsg, setSucMsg } = useMessage()
  const location = useLocation()

  // 顯示五秒後移除
  useEffect(() => {
    if (errMsg) {
      const timer = setTimeout(() => {
        setErrMsg('')
      }, 5000)

      return () => clearTimeout(timer)
    }
    if (sucMsg) {
      const timer = setTimeout(() => {
        setSucMsg('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [errMsg, sucMsg])

  // 導向其他頁面後後移除
  useEffect(() => {
    setErrMsg('')
    setSucMsg('')
  }, [location.pathname])

  if (errMsg) {
    return <div className={S.error}>{t(errMsg)}</div>
  }

  if (sucMsg) {
    return <div className={S.success}>{t(sucMsg)}</div>
  }

  return null
}

export default Message
