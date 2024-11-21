// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import Icon from '../../../components/Element/Icon'

// 展開折疊按鈕
function ToggleButton({ style, onClick, isVisible }) {
  return (
    <button className={`${S.toggleButton} ${style}`} type="button" onClick={onClick}>
      <Icon icon={isVisible ? 'faMinus' : 'faPlus'} />
    </button>
  )
}

export default ToggleButton
