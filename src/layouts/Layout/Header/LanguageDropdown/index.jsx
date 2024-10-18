// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState } from 'react'
// 組件 (component)
import Icon from '../../../../components/Icon'

// 語言選單
function LanguageDropdown() {
  const [show, setShow] = useState(false)
  const toggleDropdown = () => setShow((prevShow) => !prevShow)

  return (
    <button className={S.languageDropdown} onClick={toggleDropdown}>
      <div className={`${S.flipCard} ${show ? S.flip : ''}`}>
        <div className={S.front}>
          <Icon style={S.earthAmericas} icon="faEarthAmericas" />
        </div>
        <div className={S.back}>
          <Icon style={S.earthAsia} icon="faEarthAsia" />
        </div>
      </div>
    </button>
  )
}

export default LanguageDropdown
