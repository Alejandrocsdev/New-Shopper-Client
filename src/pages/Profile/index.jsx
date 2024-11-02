// 樣式模組 (css module)
import S from './style.module.css'
// 工具 (utils)
import { privateAvatarSrc } from '../../utils/avatarSrc'
// 函式庫 (library)
import { useState } from 'react'
// 自訂函式 (custom function)
import useRedux from '../../hooks/useRedux'
import useLangNavigate from '../../hooks/useLangNavigate'
import { signOut } from '../../api/request/auth'
// 組件
import ImageUpload from '../../components/ImageUpload'
import Loading from '../../components/Laoding'

// 首頁
function Profile() {
  const langNavigate = useLangNavigate()
  const { clearAuth, user } = useRedux()
  const avatar = privateAvatarSrc(user?.avatar?.link)
  const [isLoading, setIsLoading] = useState(false)

  const onSignOut = async () => {
    setIsLoading(true)
    try {
      const response = await signOut()
      console.log('Receive [post /auth/sign-out] response:', response.message)
      clearAuth()
      langNavigate('/')
    } catch (error) {
      console.error('Catch [post /auth/sign-out] error:', error.message)
    } finally {
      setIsLoading(false)
    }
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
              {isLoading ? <Loading height="1rem" /> : '登出'}
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
