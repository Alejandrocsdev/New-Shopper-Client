// 樣式模組 (css module)
import S from './style.module.css'
// 工具 (utils)
import { privateAvatarSrc } from '../../../utils/avatarSrc'
// 函式庫 (library)
import { useState } from 'react'
import { useForm } from 'react-hook-form'
// 自訂函式 (custom function)
import useRedux from '../../../hooks/useRedux'
import { putUser } from '../../../api/request/user'
import { useMessage } from '../../../context/MessageContext'
// 組件
import ImageUpload from '../../../components/UI/Button/ImageUpload'
import LabeledInput from './LabeledInput'

// 首頁
function Info() {
  const { setAuth, user } = useRedux()
  const { setErrMsg } = useMessage()
  const avatar = privateAvatarSrc(user?.avatar?.link)

  const { handleSubmit, reset, register } = useForm()

  const [resetTrigger, setResetTrigger] = useState(false)

  const handleReset = () => {
    setResetTrigger((prev) => !prev)
    reset()
  }

  const onSubmit = async (data) => {
    try {
      const response = await putUser(user?.id, data)
      console.log('Receive [put /user/:userId] response:', response.message)
      console.log('Receive [put /user/:userId] data:', response.user)
      setAuth({ user: response.user })
      handleReset()
    } catch (error) {
      console.error('Catch [put /user/:userId] error:', error.message)
      setErrMsg(error.message)
    }
  }

  return (
    <>
      <div className={S.header}>個人資料</div>
      <div className={S.infoContainer}>
        <div className={S.info}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LabeledInput
              label="Username"
              id="username"
              type="text"
              placeholder="請輸入帳號"
              dataValue={user?.username}
              isUsername={{ state: true, value: user?.usernameModified }}
              resetData={{ reset, resetTrigger }}
              register={register}
            />
            <LabeledInput
              label="Password"
              id="password"
              type="password"
              placeholder="請輸入舊密碼"
              dataValue="****************"
              isUsername={{ state: false }}
              resetData={{ reset, resetTrigger }}
              register={register}
            />
            <LabeledInput
              label="Email"
              id="email"
              type="text"
              placeholder="請輸入信箱"
              dataValue={user?.email || '- - -'}
              isUsername={{ state: false }}
              resetData={{ reset, resetTrigger }}
              register={register}
            />
            <LabeledInput
              label="Phone"
              id="phone"
              type="tel"
              placeholder="請輸入電話"
              dataValue={user?.phone || '- - -'}
              isUsername={{ state: false }}
              resetData={{ reset, resetTrigger }}
              register={register}
            />
            <div className={S.submit}>
              <button type="submit" className={S.updateSubmit}>
                提交
              </button>
              <button type="button" className={S.resetSubmit} onClick={handleReset}>
                重置
              </button>
            </div>
          </form>
        </div>
        <div className={S.avatarContainer}>
          <img src={avatar} />
          <ImageUpload />
          <div className={S.rules}>
            <div>檔案大小&#65306; &lt; 3MB</div>
            <div>檔案格式&#65306; JPEG / PNG</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Info
