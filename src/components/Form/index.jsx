// 函式庫 (library)
import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
// 組件 (component)
import { joiResolver } from '@hookform/resolvers/joi'
import FormError from './FormError'
import SubmitButton from '../SubmitButton'

// 錨點
function Form({ schema, onSubmit, submitText, setFormContext, children }) {
  const methods = useForm({
    resolver: schema ? joiResolver(schema) : undefined,
    mode: 'onChange',
    shouldFocusError: false
  })

  const errors = methods.formState.errors
  const isValid = methods.formState.isValid
  const isSubmitting = methods.formState.isSubmitting

  useEffect(() => {
    if (setFormContext) {
      setFormContext({
        watch: methods.watch,
        reset: methods.reset,
        setError: methods.setError,
        clearErrors: methods.clearErrors
      })
    }
  }, [setFormContext, methods])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {errors.root && <FormError message={errors.root.message} />}
        {children}
        <SubmitButton isValid={isValid} isSubmitting={isSubmitting}>
          {submitText}
        </SubmitButton>
      </form>
    </FormProvider>
  )
}

export default Form
