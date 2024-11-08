// 樣式模組 (css module)
import S from './style.module.css'
// 工具 (utils)
import { privateAvatarSrc } from '../../utils/avatarSrc'
// 函式庫 (library)
import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
// 自訂函式 (custom function)
import useRedux from '../../hooks/useRedux'
import useLangNavigate from '../../hooks/useLangNavigate'
import { signOut } from '../../api/request/auth'
// 組件
import ImageUpload from '../../components/ImageUpload'
import Loading from '../../components/Laoding'

// 首頁
function Profile() {
  const navigate = useNavigate()
  const location = useLocation()
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

  const isInfo = location.pathname.includes('info')
  const isAddress = location.pathname.includes('address')
  const isHistory = location.pathname.includes('history')
  const isKyc = location.pathname.includes('kyc')

  return (
    <main className={S.main}>
      <div className={S.container}>
        <div className={S.menu}>
          <div className={S.header}>
            <img src={avatar} />
            <span>{user?.username}</span>
          </div>
          <ul className={S.list}>
            <li onClick={() => navigate('info')} className={isInfo ? S.active : ''}>
              個人資料
            </li>
            <li onClick={() => navigate('address')} className={isAddress ? S.active : ''}>
              門市地址
            </li>
            <li onClick={() => navigate('history')} className={isHistory ? S.active : ''}>
              購物紀錄
            </li>
            <li onClick={() => navigate('kyc')} className={isKyc ? S.active : ''}>
              身分驗證
            </li>
            <li className={S.signOut} onClick={onSignOut}>
              {isLoading ? <Loading height="1rem" /> : '登出'}
            </li>
          </ul>
        </div>
        <div className={S.content}>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default Profile
