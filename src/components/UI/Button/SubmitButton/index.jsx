// 模組樣式 (module css)
import S from './style.module.css'
// 組件 (component)
import Loading from '../../Laoding'

// 提交按鈕
const SubmitButton = ({ type = 'submit', isValid, isSubmitting, style, onClick, children }) => {
  return (
    <>
      {type === 'submit' 
      ? <button
          className={`${S.submit} ${isValid ? S.allowed : S.notAllowed}`}
          type={type}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? <Loading /> : children}
        </button>
      : <button className={`${S.submit} ${style}`} type={type} onClick={onClick}>
          {children}
        </button>}
    </>
  )
}

export default SubmitButton
