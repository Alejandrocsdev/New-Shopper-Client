// 函式庫 (library)
import { useForm, FormProvider } from 'react-hook-form'
// 組件 (component)
import { joiResolver } from '@hookform/resolvers/joi'
import SubmitButton from '../SubmitButton'

// 錨點
function Form({ schema, onSubmit, submitText, children }) {
  const methods = useForm({
    resolver: schema ? joiResolver(schema) : undefined,
    mode: 'onChange',
    shouldFocusError: false
  })

  const isValid = methods.formState.isValid
  const isSubmitting = methods.formState.isSubmitting

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
        <SubmitButton isValid={isValid} isSubmitting={isSubmitting}>
          {submitText}
        </SubmitButton>
      </form>
    </FormProvider>
  )
}

export default Form
