// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { useState } from 'react'
// 自訂函式 (custom function)
import { setWordStatus } from '../../../api/request/ecpay'
// 組件 (component)
import Form from '../../../components/Element/Form'
import Select from '../../../components/Element/Select'
import Table from '../../../components/Element/Table'
import Input from '../../../components/Element/Input'
import SubmitButton from '../../../components/UI/Button/SubmitButton'
import ToggleButton from '../ToggleButton'

// 設定字軌號碼狀態
function SetWordStatus() {
  const [formContext, setFormContext] = useState(null)
  const [result, setResult] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible((prev) => !prev)

  const onSource = async (data) => {
    try {
      const response = await setWordStatus(data)
      console.log('Receive [post /ecpay/einvoice/set-word-status] response:', response.message)
      console.log('Receive [post /ecpay/einvoice/set-word-status] data:', response.result)
      const { RtnCode, RtnMsg, TrackID } = response.result
      if (RtnCode === 1) {
        setResult(`設定${RtnMsg}`)
      } else {
        setResult(`${RtnMsg}`)
      }
    } catch (error) {
      formContext.setError('root', { message: error.message })
      console.error('Catch [post /ecpay/einvoice/set-word-status] error:', error.message)
    }
  }

  const schema = Joi.object({
    TrackID: Joi.string()
      .pattern(/^[0-9]{4}$/)
      .required(),
    InvoiceStatus: Joi.string()
      .pattern(/^[0-2]$/)
      .required()
  })

  return (
    <div className={S.container}>
      <div className={S.titleContainer}>
        <h3 className={S.title}>4. 設定字軌號碼狀態</h3>
        <ToggleButton style={S.toggleButton} onClick={toggleVisibility} isVisible={isVisible} />
        <SubmitButton
          type="button"
          style={`${S.removeBtn} ${result ? '' : S.hide}`}
          onClick={() => setResult('')}
        >
          取消
        </SubmitButton>
      </div>

      <Form
        style={`${S.form} ${isVisible ? '' : S.hide}`}
        schema={schema}
        onSubmit={onSource}
        submitText="查詢"
        setFormContext={setFormContext}
        errorStyle={S.formError}
      >
        <label className={S.label} htmlFor="4TrackID">
          字軌號碼ID:
        </label>
        <Input
          id="4TrackID"
          name="TrackID"
          placeholder={'請輸入字軌號碼ID'}
          errMsg={'字軌號碼ID需為4碼'}
          maxLength="4"
          hide
        />
        <label className={S.label} htmlFor="4InvoiceStatus">
          發票字軌狀態:
          <div className={S.alert}>(停用後不得暫停)</div>
        </label>
        <Select id="4InvoiceStatus" style={S.select} name="InvoiceStatus">
          <option value="0">停用</option>
          <option value="1">暫停</option>
          <option value="2">啟用</option>
        </Select>
      </Form>
      {result && <div className={S.result}>{result}</div>}
    </div>
  )
}

export default SetWordStatus
