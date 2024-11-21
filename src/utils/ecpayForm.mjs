export const ecpayForm = (action, params) => {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = action

  Object.keys(params).forEach(key => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = params[key]
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
}
