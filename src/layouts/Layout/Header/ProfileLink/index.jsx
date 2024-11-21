// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import Anchor from '../../../../components/Element/Anchor'

// 會員頭像 連結
function ProfileLink({ avatar, username }) {
  return (
    <Anchor style={S.profileLink} int="/profile">
      <img className={S.avatar} src={avatar} />
      <div className={S.username}>{username}</div>
    </Anchor>
  )
}

export default ProfileLink
