export const colorLog = (text, color, data) => {
  const hasPart = text.match(/{{(.*?)}}/)
  const capturedText = hasPart ? hasPart[1] : ''
  const replacedText = text.replace(/{{(.*?)}}/, '%c%s%c')
  if (replacedText.includes('%c%s%c')) {
    console.log(replacedText, `color: ${color};`, capturedText, 'color: inherit;', data || '')
  } else {
    console.log(`%c${text}`, `color: ${color};`, data || '')
  }
}

export const colorError = (text, color, data) => {
  const hasPart = text.match(/{{(.*?)}}/)
  const capturedText = hasPart ? hasPart[1] : ''
  const replacedText = text.replace(/{{(.*?)}}/, '%c%s%c')
  if (replacedText.includes('%c%s%c')) {
    console.error(replacedText, `color: ${color};`, capturedText, 'color: inherit;', data || '')
  } else {
    console.error(`%c${text}`, `color: ${color};`, data || '')
  }
}