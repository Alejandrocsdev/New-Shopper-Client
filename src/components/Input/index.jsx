// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useFormContext } from 'react-hook-form'

// 錨點
function Input({ name, type = 'text', placeholder, maxLength, errMsg, errOff }) {
  const { register, formState } = useFormContext()
  const errors = formState.errors

  return (
    <>
      <input
        className={`${S.input} ${errors[name] ? S.invalid : ''}`}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        {...register(name)}
      />
      {/* 錯誤訊息 */}
      {!errOff && <div className={S.errMsg}>{errors[name] ? errMsg : ''}</div>}
    </>
  )
}

export default Input
