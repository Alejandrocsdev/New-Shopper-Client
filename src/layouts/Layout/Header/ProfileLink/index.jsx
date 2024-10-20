// 樣式模組 (css module)
import S from './style.module.css'
// 組件 (component)
import Anchor from '../../../../components/Anchor'
// 圖檔 (image)
import avatarPng from '../../../../assets/img/default/avatar.png'

// 會員頭像　連結
function ProfileLink({ avatar, username }) {
  return (
    <Anchor style={S.profileLink} int="/profile">
      <img className={S.avatar} src={avatar || avatarPng} />
      <div className={S.username}>{username}</div>
    </Anchor>
  )
}

export default ProfileLink
