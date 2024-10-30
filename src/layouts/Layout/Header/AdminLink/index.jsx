// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import Anchor from '../../../../components/Anchor'

// 後台 連結
function AdminLink() {
  return (
    <Anchor style={S.adminLink} int="/admin">
      <div className={S.admin}>Admin Panel</div>
    </Anchor>
  )
}

export default AdminLink
