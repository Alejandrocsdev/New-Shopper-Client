// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
// 組件 (component)
import Icon from '../../../Icon'

// 密碼輸入欄
const Criteria = ({ name }) => {
  const { t } = useTranslation()

  const { watch, formState: { dirtyFields } } = useFormContext()
  const password = watch(name, '')
  const isDirty = dirtyFields.password

  const schema = Joi.object({
    lowerCase: Joi.string().regex(/[a-z]/).required(),
    upperCase: Joi.string().regex(/[A-Z]/).required(),
    number: Joi.string().regex(/\d/).required(),
    length: Joi.string().min(8).max(16).required()
    // length: Joi.string().regex(/^.{8,16}$/).required()
  })

  const { error } = schema.validate(
    { lowerCase: password, upperCase: password, length: password, number: password },
    { abortEarly: false }
  )

  const rules = [
    { rule: 'lowerCase', message: t('password.lowerCase') },
    { rule: 'upperCase', message: t('password.upperCase') },
    { rule: 'number', message: t('password.number') },
    { rule: 'length', message: t('password.length') }
  ]

  const isValid = (ruleName) => {
    if (!error) return true
    return !error.details.some((detail) => detail.context.key === ruleName)
  }

  const getCriteriaClass = (ruleName) => {
    if (!isDirty) return ''
    return isValid(ruleName) ? S.valid : S.invalid
  }

  const getIcon = (ruleName) => {
    return isValid(ruleName) ? 'faCircleCheck' : 'faCircleXmark'
  }

  return (
    <div className={S.criteria}>
      {rules.map(({ rule, message }, index) => (
        <div key={index} className={`${S.criteriaText} ${getCriteriaClass(rule)}`}>
          <span>
            <Icon style={S.valIcon} icon={getIcon(rule)} />
          </span>
          <span>{message}</span>
        </div>
      ))}
    </div>
  )
}

export default Criteria
