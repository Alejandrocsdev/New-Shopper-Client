// 模組樣式 (module css)
import S from './style.module.css'

function StockCount({ style, stock, setStock, totalStock }) {
  const handleIncrement = () => {
    if (stock < totalStock) {
      setStock(stock + 1)
    }
  }

  const handleDecrement = () => {
    if (stock > 1) {
      setStock(stock - 1)
    }
  }

  return (
    <div className={style}>
      <button
        className={`${S.countBtn} ${stock === 1 ? S.red : ''}`}
        type="button"
        onClick={handleDecrement}
        disabled={stock <= 1}
      >
        {stock === 1 ? 'X' : '-'}
      </button>
      <input className={S.stock} value={stock} readOnly />
      <button
        className={`${S.countBtn} ${stock === totalStock ? S.red : ''}`}
        type="button"
        onClick={handleIncrement}
        disabled={stock >= totalStock}
      >
        {stock === totalStock ? 'X' : '+'}
      </button>
    </div>
  )
}

export default StockCount
