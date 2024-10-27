// 函式庫 (library)
import Joi from 'joi'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// 自訂函式 (custom function)
import { sendOtp, sendLink } from '../../../api/request/verif'
import { useAuthStep } from '../../../context/AuthStepContext'
import { useLang } from '../../../context/LangContext'
// 組件 (component)
import StepCard from '../../../components/StepCard'
import Form from '../../../components/Form'
import Input from '../../../components/Input'

function ResetStep() {
  const { t } = useTranslation()
  const { to } = useAuthStep()
  const { lang } = useLang()

  const [formContext, setFormContext] = useState(null)
  const [isPhone, setIsPhone] = useState(false)

  const schema = Joi.object({
    resetKey: Joi.string().required()
      // 如輸入值都是數字 => phone
      .when(Joi.string().regex(/^\d+$/), {
        // phone
        then: Joi.string().regex(/^09\d{8}$/, { name: 'phone' }).required(),
        // email
        // tlds (Top-Level Domains)
        // 允許像 test@example.local 這樣的域名，而不僅僅是 .com, .org 等常見TLD
        // if { tlds: { allow: true } } => Error Message: Uncaught e2.exports: Built-in TLD list disabled
        otherwise: Joi.string().email({ tlds: { allow: false } }).required()
      })
  })

  const onSubmit = async (data) => {
    try {
      const { resetKey } = data
      console.log('Sent form data:', data)

      if (isPhone) {
        const response = await sendOtp(resetKey, true)
        console.log('Receive [post /verif/send/otp] response:', response.message)

        to('+', { phone: resetKey })
      } else {
        const response = await sendLink(resetKey, lang)
        console.log('Receive [post /verif/send/link] response:', response.message)
        
        to('+', { email: resetKey })
      }
    } catch (error) {
      console.error(`Catch ${error.endpoint} error:`,error.message)
      formContext.setError('root', { message: t(error.i18n) })
    }
  }

  useEffect(() => {
    if (formContext) {
      // Watch for changes to the resetKey field and trigger side effects
      const subscription = formContext.watch((value) => {
        const { error } = schema.validate(value, { abortEarly: false })
        if (error?.details[0]?.context?.name === 'phone') {
          setIsPhone(true)
        } else if (error?.details[0]?.type === 'string.email') {
          setIsPhone(false)
        }
      }, 'resetKey') // Watch only the resetKey field
      // Cleanup the subscription when the component unmounts or formContext changes
      return () => subscription.unsubscribe()
    }
  }, [formContext])

  return (
    <StepCard title={t('title.resetPassword')} back="/sign-in">
      <Form
        schema={schema}
        submitText={t('step.next')}
        onSubmit={onSubmit}
        setFormContext={setFormContext}
      >
        {/* resetKey */}
        <Input
          name="resetKey"
          placeholder={t('input.phoneOrEmail')}
          errMsg={t(isPhone ? 'input.fillPhone' : 'input.fillEmail')}
        />
      </Form>
    </StepCard>
  )
}

export default ResetStep
