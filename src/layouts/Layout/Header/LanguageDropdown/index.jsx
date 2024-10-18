// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useRef } from 'react'
// 自訂函式 (custom function)
import useClickOutside from '../../../../hooks/useClickOutside'
// 組件 (component)
import Icon from '../../../../components/Icon'

// 語言選單
function LanguageDropdown() {
  const [showDropdown, setShowDropdown] = useState(false)
  const toggleDropdown = () => setShowDropdown((prevState) => !prevState)

  const dropdownRef = useRef(null)
  useClickOutside(dropdownRef, () => setShowDropdown(false))

  const currentLang = 'zh'

  return (
    <div className={S.languageDropdown} onClick={toggleDropdown} ref={dropdownRef}>
      {/* 語言按鈕 */}
      <button className={`${S.dropdownButton} ${showDropdown ? S.flip : ''}`}>
        <div className={S.front}>
          <Icon style={S.earthAmericas} icon="faEarthAmericas" />
        </div>
        <div className={S.back}>
          <Icon style={S.earthAsia} icon="faEarthAsia" />
        </div>
      </button>
      {/* 下拉選單 */}
      <ul
        className={`${S.dropdown} ${showDropdown ? S.show : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <li className={`${S.li} ${currentLang === 'zh' ? S.active : ''}`}>
          <img src="https://hatscripts.github.io/circle-flags/flags/tw.svg" />
          <span>中文</span>
        </li>
        <li className={`${S.li} ${currentLang === 'en' ? S.active : ''}`}>
          <img src="https://hatscripts.github.io/circle-flags/flags/gb.svg" />
          <span>English</span>
        </li>
        <li className={`${S.li} ${currentLang === 'es' ? S.active : ''}`}>
          <img src="https://hatscripts.github.io/circle-flags/flags/uy.svg" />
          <span>Español</span>
        </li>
      </ul>
    </div>
  )
}

export default LanguageDropdown
