// 模組樣式 (module css)
import S from './style.module.css'
// 組件 (component)
import Icon from '../../Icon'

// 表單錯誤
const FormError = ({ style, message }) => {
  return (
    <div className={`${S.formError} ${style}`}>
      <div className={S.crossIcon}>
        <Icon icon="faCircleXmark" />
      </div>
      <div className={S.message}>{message}</div>
    </div>
  )
}

export default FormError
