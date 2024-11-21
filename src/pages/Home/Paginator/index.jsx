// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import Icon from '../../../components/Element/Icon'

// 首頁
function Paginator({ showPages, currentPage, totalPage, onPageChange }) {
  const actualShowPages = totalPage < showPages ? totalPage : showPages
  const pages = Array.from({ length: actualShowPages }, (_, index) => {
    if (currentPage < totalPage - (actualShowPages - 1)) {
      return index + currentPage
    } else {
      return index + (totalPage - (actualShowPages - 1))
    }
  })

  return (
    <div className={S.paginator}>
      <button
        className={`${S.page} ${currentPage === 1 ? S.closed : ''}`}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        type="button"
      >
        <Icon icon="faBackwardStep" />
      </button>
      <button
        className={`${S.page} ${currentPage === 1 ? S.closed : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type="button"
      >
        <Icon icon="faCaretLeft" />
      </button>
      {pages.map(page => (
        <button
          className={`${S.page} ${page === currentPage ? S.clicked : ''}`}
          onClick={() => onPageChange(page)}
          key={page}
          type="button"
        >
          {page}
        </button>
      ))}
      <button
        className={`${S.page} ${currentPage === totalPage ? S.closed : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        type="button"
      >
        <Icon icon="faCaretRight" />
      </button>
      <button
        className={`${S.page} ${currentPage === totalPage ? S.closed : ''}`}
        onClick={() => onPageChange(totalPage)}
        disabled={currentPage === totalPage}
        type="button"
      >
        <Icon icon="faForwardStep" />
      </button>
    </div>
  )
}

export default Paginator
