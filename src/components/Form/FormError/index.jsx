// 模組樣式
import S from './style.module.css'
// 組件 (component)
import Icon from '../../Icon'

// 表單錯誤
const FormError = ({ message }) => {
  return (
    <div className={S.formError}>
      <div className={S.crossIcon}>
        <Icon icon="faCircleXmark" />
      </div>
      <div className={S.message}>{message}</div>
    </div>
  )
}

export default FormError
