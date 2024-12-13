// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import Joi from 'joi'
import { useState } from 'react'
// 自訂函式 (custom function)
import { getWordSetting } from '../../../api/request/ecpay'
// 組件 (component)
import Form from '../../../components/Element/Form'
import Select from '../../../components/Element/Select'
import Table from '../../../components/Element/Table'
import Input from '../../../components/Element/Input'
import SubmitButton from '../../../components/UI/Button/SubmitButton'
import ToggleButton from '../ToggleButton'

// 查詢字軌
function GetWordSetting() {
  const [formContext, setFormContext] = useState(null)
  const [source, setSource] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(prev => !prev)

  const onSource = async data => {
    try {
      const response = await getWordSetting(data)
      console.log('Receive [post /ecpay/einvoice/get-word-setting] response:', response.message)
      console.log('Receive [post /ecpay/einvoice/get-word-setting] data:', response.result)
      setSource(response.result?.InvoiceInfo || [{ message: response.result.RtnMsg }])
    } catch (error) {
      formContext.setError('root', { message: error.message })
      console.error('Catch [post /ecpay/einvoice/get-word-setting] error:', error.message)
    }
  }

  const schema = Joi.object({
    InvoiceYear: Joi.string()
      .pattern(/^[0-9]{3}$/)
      .required(),
    InvoiceTerm: Joi.string()
      .pattern(/^[0-6]$/)
      .required(),
    UseStatus: Joi.string()
      .pattern(/^[0-6]$/)
      .required(),
    InvoiceHeader: Joi.string()
      .allow('')
      .optional()
      .when(Joi.string().min(1), {
        then: Joi.string()
          .length(2)
          .pattern(/^[A-Z]{2}$/)
      })
  })

  const titles = source[0]?.message
    ? ['回應訊息']
    : [
        '字軌號碼ID',
        '發票年度',
        '發票期別',
        '發票類別',
        '字軌類別',
        '字軌名稱',
        '起始發票編號',
        '結束發票編號',
        '目前已使用號碼',
        '使用狀態',
        '特店編號',
        '產品服務別代號'
      ]

  const columnConfig = [
    // 字軌號碼ID
    { sorter: true },
    // 發票年度
    {},
    // 發票期別
    {
      filters: [
        { text: '1: 1-2月', value: 1 },
        { text: '2: 3-4月', value: 2 },
        { text: '3: 5-6月', value: 3 },
        { text: '4: 7-8月', value: 4 },
        { text: '5: 9-10月', value: 5 },
        { text: '6: 11-12月', value: 6 }
      ]
    },
    // 發票類別
    {},
    // 字軌類別
    {},
    // 字軌名稱
    {},
    // 起始發票編號
    { sorter: true },
    // 結束發票編號
    { sorter: true },
    // 目前已使用號碼
    {},
    // 使用狀態
    {
      filters: [
        { text: '1: 未啟用', value: 1 },
        { text: '2: 使用中', value: 2 },
        { text: '3: 已停用', value: 3 },
        { text: '4: 暫停中', value: 4 },
        { text: '5: 待審核', value: 5 },
        { text: '6: 審核不通過', value: 6 }
      ]
    },
    // 特店編號
    {},
    // 產品服務別代
    {}
  ]

  return (
    <div className={S.container}>
      <div className={S.titleContainer}>
        <h3 className={S.title}>2. 查詢字軌</h3>
        <ToggleButton style={S.toggleButton} onClick={toggleVisibility} isVisible={isVisible} />
        <SubmitButton
          type="button"
          style={`${S.removeBtn} ${source.length ? '' : S.hide}`}
          onClick={() => setSource([])}
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
        <label className={S.label} htmlFor="2InvoiceYear">
          發票年度:
        </label>
        <Select id="2InvoiceYear" style={S.select} name="InvoiceYear">
          <option value="112">112</option>
          <option value="113">113</option>
          <option value="114">114</option>
        </Select>
        <label className={S.label} htmlFor="2InvoiceTerm">
          發票期別:
        </label>
        <Select id="2InvoiceTerm" style={S.select} name="InvoiceTerm">
          <option value="0">全部</option>
          <option value="1">1-2月</option>
          <option value="2">3-4月</option>
          <option value="3">5-6月</option>
          <option value="4">7-8月</option>
          <option value="5">9-10月</option>
          <option value="6">11-12月</option>
        </Select>
        <label className={S.label} htmlFor="2UseStatus">
          使用狀態:
        </label>
        <Select id="2UseStatus" style={S.select} name="UseStatus">
          <option value="0">全部</option>
          <option value="1">未啟用</option>
          <option value="2">使用中</option>
          <option value="3">已停用</option>
          <option value="4">暫停中</option>
          <option value="5">待審核</option>
          <option value="6">審核不通過</option>
        </Select>
        <label className={S.label} htmlFor="2InvoiceHeader">
          字軌名稱:
        </label>
        <Input
          id="2InvoiceHeader"
          name="InvoiceHeader"
          placeholder={'請輸入字軌名稱'}
          errMsg={'正確格式: CK, LX'}
          maxLength="2"
          hide
        />
      </Form>
      {source.length !== 0 && (
        <Table
          style={`${S.table} ${isVisible ? '' : S.hide}`}
          titles={titles}
          source={source}
          idColumn={!source[0]?.message}
          columnConfig={columnConfig}
        />
      )}
    </div>
  )
}

export default GetWordSetting
