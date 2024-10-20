// 模組樣式 (module css)
import S from './style.module.css'

// 提交按鈕
const SubmitButton = ({ type = 'submit', isValid, isSubmitting, children }) => {
  return (
    <>
      {type === 'submit' 
      ? <button
          className={`${S.submit} ${isValid ? S.allowed : S.notAllowed}`}
          type={type}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Loading...' : children}
        </button>
      : <button className={S.submit} type={type}>
          {children}
        </button>}
    </>
  )
}

export default SubmitButton
