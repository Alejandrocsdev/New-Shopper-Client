// 自訂函式 (custom function)
import { refresh } from '../api/request/auth'
import { useError } from '../context/ErrorContext'

const useRefreshToken = () => {
  const { setErrMsg } = useError()

  const refreshToken = async () => {
    try {
      const response = await refresh()
      console.log('Refresh Token Response:', response.message)
      console.log('Access Token:', response.accessToken)
    } catch (error) {
      console.error(error.message)
      setErrMsg(error.i18n)
    }
  }
  return refreshToken
}

export default useRefreshToken
