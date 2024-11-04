// 模組樣式 (module css)
import S from './style.module.css'

const Loading = ({ height = '1.875rem' }) => {
  const borderThickness = `calc(${height} * 0.16)`

  return (
    <div className={S.loading}>
      <div
        className={S.spinner}
        style={{
          height: height,
          borderWidth: borderThickness,
          borderTopWidth: borderThickness
        }}
      ></div>
    </div>
  )
}

export default Loading
