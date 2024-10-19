// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useRef } from 'react'
// 自訂函式 (custom function)
import { i18next } from '../../../../utils/i18next'
import useClickOutside from '../../../../hooks/useClickOutside'
// 組件 (component)
import Icon from '../../../../components/Icon'
// 資料 (data)
import languages from '../../../../assets/locales/languages'

// 語言選單
function LanguageDropdown() {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setShowDropdown((prevState) => !prevState)
  
  const changeLanguage = (code) => {
    i18next.changeLanguage(code)
    localStorage.setItem('lang', code)
  }

  useClickOutside(dropdownRef, () => setShowDropdown(false))

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
        {languages.map((language) => (
          <li
            key={language.code}
            className={`${S.li} ${i18next.language === language.code ? S.active : ''}`}
            onClick={() => changeLanguage(language.code)}
          >
            <img src={`https://hatscripts.github.io/circle-flags/flags/${language.flag}.svg`} />
            <span>{language.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LanguageDropdown
