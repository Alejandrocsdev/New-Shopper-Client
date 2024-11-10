// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

// 選擇標籤
function Select({ style, id, name, children, defaultValue }) {
  const {
    register,
    formState: { errors },
    clearErrors,
    setValue
  } = useFormContext()
  const [errorCleared, setErrorCleared] = useState(false)

  // 選擇不同選項時, 移除Form錯誤訊息
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

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue)
    }
  }, [defaultValue, setValue, name])

  return (
    <select
      id={id}
      className={`${S.select} ${style}`}
      defaultValue={defaultValue}
      {...register(name, { onChange: () => errorClear() })}
    >
      {children}
    </select>
  )
}

export default Select
