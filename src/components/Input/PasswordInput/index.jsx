// 模組樣式
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
// 組件 (component)
import Icon from '../../Icon'
import Input from '../index'
import Criteria from './Criteria'

// 密碼輸入欄
const PasswordInput = ({ name, criteria }) => {
  const { t } = useTranslation()

  const { setFocus } = useFormContext()

  useEffect(() => {
    if (criteria) {
      setFocus(name)
    }
  }, [])

  const [showPwd, setShowPwd] = useState(false)
  const togglePassword = () => setShowPwd(!showPwd)

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

      {criteria && <Criteria name={name} />}
    </>
  )
}

export default PasswordInput
