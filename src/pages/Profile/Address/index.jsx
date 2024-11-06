// 樣式模組 (css module)
import S from './style.module.css'
// 工具 (utils)
// 函式庫 (library)
import { useEffect, useState } from 'react'
// 自訂函式 (custom function)
import useRedux from '../../../hooks/useRedux'
import { deleteStore, putStoreDefault } from '../../../api/request/store'
// 組件 (component)
import GetStore from '../../../components/GetStore'
// 圖檔 (image)
import sevenElevenPng from '../../../assets/img/ecpay/sevenEleven.png'
import familyMartPng from '../../../assets/img/ecpay/familyMart.png'
import okMartPng from '../../../assets/img/ecpay/okMart.png'

// 首頁
function Address() {
  const { setAuth, user } = useRedux()
  const [stores, setStores] = useState([])

  useEffect(() => {
    if (user?.stores) {
      const sortedStores = [...user.stores].sort((a, b) => b.isDefault - a.isDefault)
      setStores(sortedStores)
    }
  }, [user?.stores])

  const handleDelete = async (storeId) => {
    try {
      const response = await deleteStore(storeId)
      console.log('Receive [delete /store/:storeId] response:', response.message)
      console.log('Receive [delete /store/:storeId] data:', response.stores)
      setAuth({ user: { ...user, stores: response.stores } })
    } catch (error) {
      console.error('Catch [delete /store/:storeId] error:', error.message)
    }
  }

  const handleDefault = async (storeId) => {
    try {
      const response = await putStoreDefault(storeId)
      console.log('Receive [put /store/:storeId/default] response:', response.message)
      console.log('Receive [put /store/:storeId/default] data:', response.stores)
      setAuth({ user: { ...user, stores: response.stores } })
    } catch (error) {
      console.error('Catch [put /store/:storeId/default] error:', error.message)
    }
  }

  const storeLogo = (store) => {
    switch (store) {
      case 'UNIMARTC2C':
        return sevenElevenPng
      case 'FAMIC2C':
        return familyMartPng
      case 'OKMARTC2C':
        return okMartPng
    }
  }

  return (
    <>
      <div className={S.header}>地址</div>
      <div className={S.infoContainer}>
        <GetStore />
        <div className={S.storeAddresses}>
          {stores.map((store, index) => (
            <div className={S.storeAddress} key={index}>
              <div className={S.left}>
                <div className={S.storeLogo}>
                  <img className={S.image} src={storeLogo(store.logisticsSubType)} />
                  <div className={S.default}>{store.isDefault ? '預設' : ''}</div>
                </div>
                <div>
                  <div>門市編號: {store.cvsStoreId}</div>
                  <div>門市名稱: {store.cvsStoreName}</div>
                  <div>門市地址: {store.cvsAddress}</div>
                  <div>門市電話: {store.cvsTelephone}</div>
                </div>
              </div>
              <div className={S.right}>
                <div className={S.btn} onClick={() => handleDelete(store.id)}>
                  刪除
                </div>
                <div className={S.btn} onClick={() => handleDefault(store.id)}>
                  {store.isDefault ? '' : '設為預設'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Address
