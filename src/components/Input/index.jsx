// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useFormContext } from 'react-hook-form'

// 錨點
function Input({ name, placeholder, errMsg }) {
  const { register, formState } = useFormContext()
  const errors = formState.errors

  return (
    <>
      <div className={S.inputWrapper}>
        <input
          className={`${S.input} ${errors[name] ? S.invalid : ''}`}
          type="text"
          placeholder={placeholder}
          {...register(name)}
        />
      </div>
      {/* 錯誤訊息 */}
      <div className={S.errMsg}>{errors[name] ? errMsg : ''}</div>
    </>
  )
}

export default Input
