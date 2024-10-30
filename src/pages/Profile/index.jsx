// 樣式模組 (css module)
import S from './style.module.css'
// 工具 (utils)
import { privateAvatarSrc } from '../../utils/avatarSrc'
// 自訂函式 (custom function)
import useRedux from '../../hooks/useRedux'
import useLangNavigate from '../../hooks/useLangNavigate'
import { signOut } from '../../api/request/auth'
// 組件
import ImageUpload from '../../components/ImageUpload'

// 首頁
function Profile() {
  const langNavigate = useLangNavigate()
  const { clearAuth, user } = useRedux()
  const avatar = privateAvatarSrc(user?.avatar?.link)
  console.log('avatar', avatar)
  
  const onSignOut = async () => {
    const response = await signOut()
    console.log('Receive [post /auth/sign-out] response:', response.message)
    clearAuth()
    langNavigate('/')
  }

  return (
    <main className={S.main}>
      <div className={S.container}>
        <div className={S.menu}>
          <div className={S.header}>
            <img src={avatar} />
            <span>{user?.username}</span>
          </div>
          <ul className={S.list}>
            <li>個人資料</li>
            <li className={S.signOut} onClick={onSignOut}>
              登出
            </li>
          </ul>
        </div>
        <div className={S.content}>
          <div className={S.header}>個人資料</div>
          <div className={S.infoContainer}>
            <div className={S.info}>個人資料</div>
            <div className={S.avatarContainer}>
              <img src={avatar} />
              <ImageUpload />
              <div className={S.rules}>
                <div>檔案大小&#65306; &lt; 3MB</div>
                <div>檔案格式&#65306; JPEG / PNG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile
