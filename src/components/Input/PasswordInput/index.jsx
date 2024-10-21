// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
// 組件 (component)
import Icon from '../../Icon'
import Input from '../index'

// 密碼輸入欄
const PasswordInput = ({ name, criteria }) => {
  const { watch, formState: { dirtyFields } } = useFormContext()

  const { t } = useTranslation()
  const [showPwd, setShowPwd] = useState(false)
  const togglePassword = () => setShowPwd(!showPwd)

  const [isLowerCase, setIsLowerCase] = useState(false)
  const [isUpperCase, setIsUpperCase] = useState(false)
  const [isLength, setIsLength] = useState(false)
  const [isNumber, setIsNumber] = useState(false)

  const password = watch(name, '')
  const isDirty = dirtyFields.password

  useEffect(() => {
    setIsLowerCase(/[a-z]/.test(password))
    setIsUpperCase(/[A-Z]/.test(password))
    setIsLength(password?.length >= 8 && password?.length <= 16)
    setIsNumber(/\d/.test(password))
  }, [password])

  // 條件樣式(綠/紅)
  const getCriteriaClass = (isValid) => {
    if (!isDirty) return ''
    return isValid ? S.valid : S.invalid
  }

  const getIcon = (rule) => {
    return rule ? 'faCircleCheck' : 'faCircleXmark'
  }

  return (
    <>
      <div className={S.inputWrapper}>
        <Input
          name={name}
          type={showPwd ? 'text' : 'password'}
          placeholder={t('input.password')}
          maxLength="16"
          errMsg={t('input.fillInput')}
          errOff={criteria}
        />

        <div className={S.iconContainer} onClick={togglePassword}>
          <Icon style={S.eyeIcon} icon={showPwd ? 'faEye' : 'faEyeSlash'} />
        </div>
      </div>

      {criteria && (
        <div className={S.criteria}>
          {/* 小寫 */}
          <div className={`${S.criteriaText} ${getCriteriaClass(isLowerCase)}`}>
            <span>
              <Icon style={S.valIcon} icon={getIcon(isLowerCase)} />
            </span>
            <span>包含至少一個小寫字母</span>
          </div>
          {/* 大寫 */}
          <div className={`${S.criteriaText} ${getCriteriaClass(isUpperCase)}`}>
            <span>
              <Icon style={S.valIcon} icon={getIcon(isUpperCase)} />
            </span>
            <span>包含至少一個大寫字母</span>
          </div>
          {/* 數字 */}
          <div className={`${S.criteriaText} ${getCriteriaClass(isNumber)}`}>
            <span>
              <Icon style={S.valIcon} icon={getIcon(isNumber)} />
            </span>
            <span>包含至少一個數字</span>
          </div>
          {/* 字數 */}
          <div className={`${S.criteriaText} ${getCriteriaClass(isLength)}`}>
            <span>
              <Icon style={S.valIcon} icon={getIcon(isLength)} />
            </span>
            <span>密碼長度8-16個字元</span>
          </div>
        </div>
      )}
    </>
  )
}

export default PasswordInput
