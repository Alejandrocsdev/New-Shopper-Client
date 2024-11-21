// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

// 輸入欄標籤
function Input({ name, type = 'text', placeholder, maxLength, errMsg, errOff, hide }) {
  const {
    register,
    formState: { errors },
    clearErrors
  } = useFormContext()
  const [errorCleared, setErrorCleared] = useState(false)

  // 輸入時, 移除Form錯誤訊息
  const errorClear = () => {
    if (!errorCleared && errors.root) {
      clearErrors('root')
      setErrorCleared(true)
    }
  }

  // 錯誤若再次出現, errorCleared設為false, 才能再次清除
  useEffect(() => {
    if (errors.root) {
      setErrorCleared(false)
    }
  }, [errors.root])

  const hideErr = () => {
    if (hide) {
      return errors[name]
    } else {
      return true
    }
  }

  return (
    <>
      <input
        className={`${S.input} ${errors[name] ? S.invalid : ''}`}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        {...register(name, { onChange: () => errorClear() })}
      />
      {/* 錯誤訊息 */}
      {!errOff && hideErr() && <div className={S.errMsg}>{errors[name] ? errMsg : ''}</div>}
    </>
  )
}

export default Input
