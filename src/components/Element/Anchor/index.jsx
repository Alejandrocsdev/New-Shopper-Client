// 函式庫 (library)
import { Link, useParams } from 'react-router-dom'

// 錨點
function Anchor({ int, ext, style, target, onClick, children }) {
  const { lang } = useParams()

  return (
    <>
      {int 
      ? <Link to={`/${lang}${int !== '/' ? int : ''}`} className={style} target={target || '_self'} onClick={onClick}>
          {children}
        </Link>
      : <a href={ext} className={style} target={target || '_blank'} onClick={onClick}>
          {children}
        </a>}
    </>
  )
}

export default Anchor
