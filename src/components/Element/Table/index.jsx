// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { Table as AntTable } from 'antd'

// 表格
function Table({ style, titles, source, idColumn, columnConfig }) {
  const { Column } = AntTable

  const dataSource = source.map((data, index) => ({
    ...data,
    key: String(index + 1)
  }))

  const dataKeys = Object.keys(source[0])

  return (
    <AntTable className={`${S.tableWrapper} ${style}`} dataSource={dataSource} pagination={true}>
      {idColumn && <Column title="編號" key="index" render={(text, record, index) => index + 1} />}
      {dataKeys.map((key, index) => {
        const config = columnConfig[index] || {}
        const onFilter = (value, record) => record[key] === value
        const sorter = (a, b) => a[key] - b[key]
        const sortDirections = ['ascend', 'descend']
        return (
          <Column
            title={titles[index]}
            dataIndex={key}
            key={key}
            filters={config.filters || null}
            onFilter={config.filters ? onFilter : null}
            sorter={config.sorter ? sorter : null}
            sortDirections={config.sorter ? sortDirections : null}
          />
        )
      })}
    </AntTable>
  )
}

export default Table
