// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
// 組件 (component)
import Icon from '../../Icon'
import Input from '../'

// 電話輸入欄
const PhoneInput = ({ name }) => {
  const { isValid } = useFormContext().formState

  const { t } = useTranslation()

  return (
    <div className={S.inputWrapper}>
      <Input name={name} type="tel" placeholder={t('input.phoneNumber')} maxLength="10" errMsg={t('input.fillPhone')} />
      {isValid && (
        <div className={S.iconContainer}>
          <Icon style={S.icon} icon="faCircleCheck" />
        </div>
      )}
    </div>
  )
}

export default PhoneInput
