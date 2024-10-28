// 樣式模組 (css module)
import S from './style.module.css'
// 工具 (utils)
import { privateAvatarSrc } from '../../utils/avatarSrc'
// 函式庫 (library)
// import { useForm } from 'react-hook-form'
// import { useState, useRef } from 'react'
// 自訂函式 (custom function)
import useRedux from '../../hooks/useRedux'
import useLangNavigate from '../../hooks/useLangNavigate'
import { getAuthUser, signOut } from '../../api/request/auth'
import { putUser } from '../../api/request/user'
// 組件
import ImageUpload from '../../components/ImageUpload'

// 首頁
function Profile() {
  const langNavigate = useLangNavigate()
  const { setAuth, clearAuth, user } = useRedux()
  const avatar = privateAvatarSrc(user?.avatar?.link)

  // const [selectedFile, setSelectedFile] = useState(null)
  // const fileInputRef = useRef(null)
  
  const onSignOut = async () => {
    const response = await signOut()
    console.log('Receive [post /auth/sign-out] response:', response.message)
    clearAuth()
    langNavigate('/')
  }

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0])
  // }

  // const onUpload = async () => {
  //   fileInputRef.current.click()
  // }

  // const handleFileUpload = async () => {
  //   if (!selectedFile) {
  //     console.log('Please select a file first')
  //     return
  //   }

  //   const confirmUpload = window.confirm('是否確定上傳這張圖片？')
  //   if (!confirmUpload) return

  //   const formData = new FormData()
  //   formData.append('image', selectedFile)

  //   const uploadResponse = await putUser(formData)
  //   console.log('Receive [put /user] response:', uploadResponse.message)

  //   const userResponse = await getAuthUser()
  //   console.log('%cReceive [get /user/me] response:', 'color: orange;', userResponse.message)
  //   console.log('%cReceive [get /user/me] data:', 'color: orange;', userResponse.user)
  //   setAuth({ user: userResponse.user })
  // }

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
              {/* <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              /> */}
              {/* <button onClick={onUpload}>選擇圖片</button> */}
              {/* {selectedFile && (
                <button onClick={handleFileUpload}>上傳圖片</button>
              )} */}
              <ImageUpload style={S.upload} text='上傳照片' onSubmit />
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
