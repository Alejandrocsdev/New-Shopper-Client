// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

// 錨點
function Input({ name, type = 'text', placeholder, maxLength, errMsg, errOff }) {
  const { register, formState: { errors }, clearErrors } = useFormContext()
  const [errorCleared, setErrorCleared] = useState(false)

  // 輸入時, 移除Form錯誤訊息
  const errorClear = (e) => {
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

  return (
    <>
      <input
        className={`${S.input} ${errors[name] ? S.invalid : ''}`}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        {...register(name, { onChange: (e) => errorClear(e) })}
      />
      {/* 錯誤訊息 */}
      {!errOff && <div className={S.errMsg}>{errors[name] ? errMsg : ''}</div>}
    </>
  )
}

export default Input
