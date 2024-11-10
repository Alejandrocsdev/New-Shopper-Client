// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { useState } from 'react'
// 自訂函式 (custom function)
import { getGovWordSetting } from '../../../api/request/ecpay'
// 組件 (component)
import Form from '../../../components/Form'
import Select from '../../../components/Select'
import Table from '../../../components/Table'
import SubmitButton from '../../../components/SubmitButton'

// 查詢財政部配號結果
function GetGovWordSetting() {
  const [formContext, setFormContext] = useState(null)
  const [source, setSource] = useState([])

  const onSource = async (data) => {
    try {
      const response = await getGovWordSetting(data)
      console.log('Receive [post /ecpay/einvoice/get-gov-word-setting] response:', response.message)
      console.log('Receive [post /ecpay/einvoice/get-gov-word-setting] data:', response.result)
      setSource(response.result?.InvoiceInfo || [{ message: response.message }])
    } catch (error) {
      console.error('Catch [post /ecpay/einvoice/get-gov-word-setting] error:', error.message)
    }
  }

  const titles = source[0]?.message
    ? ['回應訊息']
    : ['發票期別', '字軌類別', '發票字軌', '起始發票編號', '結束發票編號', '申請本數']

    const schema = Joi.object({
      InvoiceYear: Joi.string()
        .pattern(/^[0-9]{3}$/)
        .required()
    })

  return (
    <div className={S.container}>
      <div className={S.titleContainer}>
        <h3 className={S.title}>1. 查詢財政部配號結果</h3>
        <SubmitButton
          type="button"
          style={`${S.removeBtn} ${source.length ? '' : S.hide}`}
          onClick={() => setSource([])}
        >
          取消
        </SubmitButton>
      </div>
      <Form style={S.form} schema={schema} onSubmit={onSource} submitText="查詢" setFormContext={setFormContext}>
        <label className={S.label} htmlFor="1InvoiceYear">發票年度:</label>
        <Select id="1InvoiceYear" style={S.select} name="InvoiceYear">
          <option value="112">112</option>
          <option value="113">113</option>
          <option value="114">114</option>
        </Select>
      </Form>

      {source.length !== 0 && (
        <Table style={S.table} titles={titles} source={source} idColumn={!source[0]?.message} />
      )}
    </div>
  )
}

export default GetGovWordSetting
