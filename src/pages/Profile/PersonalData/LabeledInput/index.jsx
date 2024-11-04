// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useEffect } from 'react'
// 自訂函式 (custom function)
import { sendOtpPrivate, verifyOtpPrivate } from '../../../../api/request/verif'
import { useError } from '../../../../context/ErrorContext'

// 首頁
function LabeledInput({ label, id, type, placeholder, dataValue, isUsername, resetData, register }) {
  const [value, setValue] = useState('')
  const [otpValue, setOtpValue] = useState('')

  const [mode, setMode] = useState(false)
  const toggleMode = () => setMode((prev) => !prev)

  const [firstOk, setFirstOk] = useState(false)
  const [secondOk, setSecondOk] = useState(false)

  const { reset, resetTrigger } = resetData

  const { setErrMsg } = useError()

  useEffect(() => {
    setValue('')
    setOtpValue('')
    setFirstOk(false)
    setSecondOk(false)
    setMode(false)
  }, [resetTrigger])

  useEffect(() => {
    setValue('')
    setOtpValue('')
    setFirstOk(false)
    setSecondOk(false)
    reset()
  }, [mode])

  const onSendOtp = async (methodData, method) => {
    try {
      const response = await sendOtpPrivate(methodData, method)
      setFirstOk(true)
      console.log('Receive [post /verif/send/otp] response:', response.message)
    } catch (error) {
      console.error('Catch [post /verif/send/otp] error:', error.message)
      setErrMsg(error.i18n)
      setFirstOk(false)
    }
  }

  const onVerifyOtp = async (methodData, method, otp) => {
    try {
      const response = await verifyOtpPrivate(methodData, method, otp)
      setSecondOk(true)
      console.log('Receive [post /verif/verify/otp] response:', response.message)
    } catch (error) {
      console.error('Catch [post /verif/verify/otp] error:', error.message)
      setErrMsg(error.i18n)
      setSecondOk(false)
    }
  }

  return (
    <>
      <label className={S.label} htmlFor={id}>
        <span>{label}</span>
        {isUsername.state && !isUsername.value && (
          <span className={S.once}> (帳號僅能修改一次)</span>
        )}
      </label>
      <div className={S.inputField}>
        {mode ? (
          <>
            <input
              {...register(id)}
              className={S.dataField}
              id={id}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {id === 'phone' || id === 'email' ? (
              <input
                className={S.otpInput}
                type="text"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                placeholder="驗證碼"
                maxLength="6"
              />
            ) : (
              <div className={S.otpSpace}></div>
            )}
          </>
        ) : (
          <div className={S.dataField}>{dataValue}</div>
        )}
        {!isUsername.value && (
          <button type="button" className={S.btn} onClick={toggleMode}>
            {mode ? '取消' : '更改'}
          </button>
        )}
        {!isUsername.state && mode && id === 'email' && (
          <>
            <button
              type="button"
              className={`${S.btn} ${firstOk ? S.valid : S.invalid}`}
              onClick={() => onSendOtp(value, 'email')}
            >
              發送驗證碼
            </button>
            <button
              type="button"
              className={`${S.btn} ${secondOk ? S.valid : S.invalid}`}
              onClick={() => onVerifyOtp(value, 'email', otpValue)}
            >
              驗證
            </button>
          </>
        )}
        {!isUsername.state && mode && id === 'phone' && (
          <>
            <button
              type="button"
              className={`${S.btn} ${firstOk ? S.valid : S.invalid}`}
              onClick={() => onSendOtp(value, 'phone')}
            >
              發送驗證碼
            </button>
            <button
              type="button"
              className={`${S.btn} ${secondOk ? S.valid : S.invalid}`}
              onClick={() => onVerifyOtp(value, 'phone', otpValue)}
            >
              驗證
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default LabeledInput
