// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { useState } from 'react'
// 自訂函式 (custom function)
import { addWordSetting } from '../../../api/request/ecpay'
// 組件 (component)
import Form from '../../../components/Element/Form'
import Select from '../../../components/Element/Select'
import Table from '../../../components/Element/Table'
import Input from '../../../components/Element/Input'
import SubmitButton from '../../../components/UI/Button/SubmitButton'
import ToggleButton from '../ToggleButton'

// 新增字軌與配號
function AddWordSetting() {
  const [formContext, setFormContext] = useState(null)
  const [result, setResult] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible((prev) => !prev)

  const onSource = async (data) => {
    try {
      const response = await addWordSetting(data)
      console.log('Receive [post /ecpay/einvoice/add-word-setting] response:', response.message)
      console.log('Receive [post /ecpay/einvoice/add-word-setting] data:', response.result)
      const { RtnCode, RtnMsg, TrackID } = response.result
      if (RtnCode === 1) {
        setResult(`新增成功: 字軌號碼ID為${TrackID}`)
      } else {
        setResult(`新增失敗: ${RtnMsg}`)
      }
    } catch (error) {
      formContext.setError('root', { message: error.message })
      console.error('Catch [post /ecpay/einvoice/add-word-setting] error:', error.message)
    }
  }

  const schema = Joi.object({
    InvoiceYear: Joi.string()
      .pattern(/^[0-9]{3}$/)
      .required(),
    InvoiceTerm: Joi.string()
      .pattern(/^[0-6]$/)
      .required(),
    InvoiceHeader: Joi.string()
      .length(2)
      .pattern(/^[A-Z]{2}$/),
      InvoiceStart: Joi.string()
      .pattern(/^[0-9]{6}(00|50)$/)
      .required(),
    InvoiceEnd: Joi.string()
      .pattern(/^[0-9]{6}(49|99)$/) 
      .required()
  })

  return (
    <div className={S.container}>
      <div className={S.titleContainer}>
        <h3 className={S.title}>3. 新增字軌與配號</h3>
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
        <label className={S.label} htmlFor="3InvoiceYear">
          發票年度:
        </label>
        <Select id="3InvoiceYear" style={S.select} name="InvoiceYear">
          <option value="112">112</option>
          <option value="113">113</option>
          <option value="114">114</option>
        </Select>
        <label className={S.label} htmlFor="3InvoiceTerm">
          發票期別:
        </label>
        <Select id="3InvoiceTerm" style={S.select} name="InvoiceTerm">
          <option value="0">全部</option>
          <option value="1">1-2月</option>
          <option value="2">3-4月</option>
          <option value="3">5-6月</option>
          <option value="4">7-8月</option>
          <option value="5">9-10月</option>
          <option value="6">11-12月</option>
        </Select>
        <label className={S.label} htmlFor="3InvoiceHeader">
          字軌名稱:
        </label>
        <Input
          id="3InvoiceHeader"
          name="InvoiceHeader"
          placeholder={'請輸入字軌名稱'}
          errMsg={'正確格式: CK, LX'}
          maxLength="2"
          hide
        />
        <label className={S.label} htmlFor="3InvoiceStart">
          起始發票編號:
        </label>
        <Input
          id="3InvoiceStart"
          name="InvoiceStart"
          placeholder={'請輸入起始發票編號'}
          errMsg={'請輸入8碼發票號碼，尾數需為00或50'}
          maxLength="8"
          hide
        />
        <label className={S.label} htmlFor="3InvoiceEnd">
          結束發票編號:
        </label>
        <Input
          id="3InvoiceEnd"
          name="InvoiceEnd"
          placeholder={'請輸入結束發票編號'}
          errMsg={'請輸入8碼發票號碼，尾數需為49或99'}
          maxLength="8"
          hide
        />
      </Form>
      {result && <div className={S.result}>{result}</div>}
    </div>
  )
}

export default AddWordSetting
