// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { Table as AntTable } from 'antd'

// 表格
function Table({ style, titles, source, idColumn }) {
  const { Column } = AntTable

  const dataSource = source.map((data, index) => ({
    ...data,
    key: String(index + 1)
  }))

  const dataKeys = Object.keys(source[0])

  return (
    <AntTable className={`${S.tableWrapper} ${style}`} dataSource={dataSource} pagination={true}>
      {idColumn && <Column title="編號" key="index" render={(text, record, index) => index + 1} />}
      {dataKeys.map((key, index) => (
        <Column
          title={titles[index]}
          dataIndex={key}
          key={key}
          filters={
            titles[index] === '發票期別'
              ? [
                  { text: '1', value: 1 },
                  { text: '2', value: 2 }
                ]
              : null
          }
          onFilter={(value, record) => record[key] === value}
          sorter={titles[index] === '發票期別' ? (a, b) => a.InvoiceTerm - b.InvoiceTerm : null}
          sortDirections={['ascend', 'descend']}
        />
      ))}
    </AntTable>
  )
}

export default Table
