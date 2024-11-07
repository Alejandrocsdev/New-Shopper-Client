// 樣式模組 (css module)
import S from './style.module.css'
// 工具 (utils)
// 函式庫 (library)
import { useState, useEffect } from 'react'
// 自訂函式 (custom function)
import useRedux from '../../../hooks/useRedux'
import { useMessage } from '../../../context/MessageContext'
import { postUserRole } from '../../../api/request/user'

// 身分驗證
function Kyc() {
  const { setSucMsg } = useMessage()
  const { setAuth, user } = useRedux()
  const [roles, setRoles] = useState(user?.roles || [])
  const isAllowed = roles.some((role) => role.name === 'seller')

  useEffect(() => {
    if (user?.roles) {
      setRoles(user?.roles)
    }
  }, [user?.roles])

  const handleVerification = async () => {
    try {
      const response = await postUserRole('seller')
      console.log('Receive [post /user/role] response:', response.message)
      console.log('Receive [post /user/role] data:', response.roles)
      setAuth({ user: { ...user, roles: response.roles } })
      setRoles(response.roles)
      setSucMsg(response.message)
    } catch (error) {
      console.error('Catch [delete /store/:storeId] error:', error.message)
    }
  }

  console.log('isAllowed', isAllowed)

  return (
    <>
      <div className={S.header}>身分驗證</div>
      <div className={S.infoContainer}>
        {isAllowed 
        ? <div className={S.verified}>完成驗證</div>
        : <div className={S.unverified}>尚未驗證</div>}
        {!isAllowed && (
          <button className={S.btn} type="button" onClick={handleVerification}>
            驗證
          </button>
        )}
      </div>
    </>
  )
}

export default Kyc
