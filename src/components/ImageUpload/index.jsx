// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useRef } from 'react'
// 自訂函式 (custom function)
import useRedux from '../../hooks/useRedux'
import { getAuthUser } from '../../api/request/auth'
import { putUserImage } from '../../api/request/user'
// 組件 (component)
import Loading from '../Laoding'
import Icon from '../Icon'

// 錨點
function ImageUpload() {
  const { setAuth } = useRedux()
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const onUpload = async () => {
    fileInputRef.current.click()
  }

  const handleFileUpload = async () => {
    if (!file) return

    // const confirmUpload = window.confirm('text')
    // if (!confirmUpload) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const uploadResponse = await putUserImage(formData)
      console.log('Receive [put /user] response:', uploadResponse.message)

      const userResponse = await getAuthUser()
      console.log('%cReceive [get /user/me] response:', 'color: orange;', userResponse.message)
      console.log('%cReceive [get /user/me] data:', 'color: orange;', userResponse.user)
      setAuth({ user: userResponse.user })
    } catch (error) {
      console.error('Error uploading file:', error)
      setFile(null)
    } finally {
      setIsLoading(false)
      setFile(null)
    }
  }

  return (
    <div className={S.imageUpload}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div className={S.chooseBtnContainer}>
        <button className={S.chooseBtn} onClick={onUpload}>選擇圖片</button>
        {file && <div className={S.iconContainer}>
          <Icon style={S.icon} icon="faCircleCheck" />
        </div>}
      </div>

      <button className={S.uploadBtn} onClick={handleFileUpload} disabled={isLoading}>
        {isLoading ? <Loading /> : '上傳圖片'}
      </button>
    </div>
  )
}

export default ImageUpload
