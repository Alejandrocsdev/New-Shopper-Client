// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useRef } from 'react'
// 自訂函式 (custom function)
import { useLang } from '../../../../context/LangContext'
import useClickOutside from '../../../../hooks/useClickOutside'
// 組件 (component)
import Icon from '../../../../components/Element/Icon'
// 資料 (data)
import languages from '../../../../assets/locales/languages'

// 語言選單
function LangDrop() {
  // 選單開關
  const [showDropdown, setShowDropdown] = useState(false)
  const toggleDropdown = () => setShowDropdown((prevState) => !prevState)

  // 點擊外部 (關閉選單)
  const dropdownRef = useRef(null)
  useClickOutside(dropdownRef, () => setShowDropdown(false))

  // 語言切換
  const { lang, switchLang } = useLang()

  return (
    <div className={S.langDrop} onClick={toggleDropdown} ref={dropdownRef}>
      {/* 語言按鈕 */}
      <button className={`${S.dropButton} ${showDropdown ? S.flip : ''}`}>
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
            className={`${S.li} ${lang === language.code ? S.active : ''}`}
            onClick={() => switchLang(language.code)}
          >
            <img src={`https://hatscripts.github.io/circle-flags/flags/${language.flag}.svg`} />
            <span>{language.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LangDrop
