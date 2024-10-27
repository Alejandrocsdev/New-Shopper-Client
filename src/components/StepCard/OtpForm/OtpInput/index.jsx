// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useRef, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const OtpInput = ({ length = 6, name }) => {
  const inputRefs = useRef([])
  const [otp, setOtp] = useState(new Array(length).fill(''))

  const {register, setValue} = useFormContext()

  // 聚焦於第一個輸入欄
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  // Change 監聽器
  const handleChange = (index, e) => {
    const { value } = e.target
    if (isNaN(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // 額外處理 hidden input 步驟
    setValue(name, newOtp.join(''), { shouldValidate: true })

    // 如果當前輸入框已填滿，聚焦下一個輸入框
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Click 監聽器
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1)

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf('')].focus()
    }
  }

  // Key Down 監聽器
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      // 按下退格鍵時聚焦前一個輸入框
      inputRefs.current[index - 1].focus()
    }
  }

  return (
    <div className={S.inputFields}>
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          ref={(input) => (inputRefs.current[index] = input)}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={S.otpInput}
        />
      ))}
      <input type="hidden" {...register(name)} />
    </div>
  )
}

export default OtpInput
