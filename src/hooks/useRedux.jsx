// 函式庫 (library)
import { useDispatch } from 'react-redux'
// 自訂函式 (custom function)
import { setCredentials, clearCredentials } from '../redux/authSlice'

const useRedux = () => {
  const dispatch = useDispatch()

  const setAuth = (authData) => {
    dispatch(setCredentials(authData))
  }

  const signOut = () => {
    dispatch(clearCredentials())
  }

  return { setAuth, signOut }
}

export default useRedux
