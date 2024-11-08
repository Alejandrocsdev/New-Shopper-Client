// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useEffect } from 'react'
// 自訂函式 (custom function)
import useRedux from '../../hooks/useRedux'
import { useMessage } from '../../context/MessageContext'
// 圖檔 (image)
import sevenElevenPng from '../../assets/img/ecpay/sevenEleven.png'
import familyMartPng from '../../assets/img/ecpay/familyMart.png'
import okMartPng from '../../assets/img/ecpay/okMart.png'

// 結帳
function Checkout() {
  const { setSucMsg } = useMessage()
  const { setAuth, user } = useRedux()
  const [cartItems, setCartItems] = useState([])
  const [stores, setStores] = useState([])

  useEffect(() => {
    if (user?.cart?.items) {
      setCartItems(user?.cart?.items)
    }
  }, [user?.cart?.items])

  useEffect(() => {
    if (user?.stores) {
      setStores(user?.stores)
    }
  }, [user?.stores])

  const totalAmount = cartItems.reduce((sum, cartItem) => {
    return sum + cartItem.product.price * cartItem.quantity
  }, 0)

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

  const defaultStore = stores.find((store) => store.isDefault)

  return (
    <main className={S.main}>
      <div className={S.container}>
        <div className={S.content}>
          <div className={S.header}>結帳</div>
          <div className={S.infoContainer}>
            <div className={S.cartItems}>
              {cartItems.length === 0 
              ? <div className={S.emptyMessage}>購物車是空的</div>
              : cartItems.map((cartItem, index) => (
                  <div key={index} className={S.cartItem}>
                    <div className={S.imgContainer}>
                      <img src={cartItem.product.image.link} className={S.image} />
                    </div>
                    <div className={S.dataContainer}>
                      <div className={S.productName}>{cartItem.product.name}</div>
                      <div className={S.productPrice}>${cartItem.product.price}</div>
                      <div className={S.quantity}>{cartItem.quantity}</div>
                      <div className={S.totalAmount}>
                        ${cartItem.quantity * cartItem.product.price}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={S.stores}>
              <div className={S.storeAddresses}>
                {defaultStore 
                ? <div className={S.storeAddress}>
                    <div className={S.left}>
                      <div className={S.storeLogo}>
                        <img className={S.image} src={storeLogo(defaultStore.logisticsSubType)} />
                        <div className={S.default}>{defaultStore.isDefault ? '預設' : ''}</div>
                      </div>
                      <div>
                        <div>門市編號: {defaultStore.cvsStoreId}</div>
                        <div>門市名稱: {defaultStore.cvsStoreName}</div>
                        <div>門市地址: {defaultStore.cvsAddress}</div>
                        <div>門市電話: {defaultStore.cvsTelephone}</div>
                      </div>
                    </div>
                  </div>
                : <div className={S.emptyMessage}>請至個人頁面選取門市</div>}
              </div>
            </div>
            <div className={S.purchase}>
              <span className={S.purchaseAmount}>
                總金額:<span>${totalAmount}</span>
              </span>
              <button className={S.purchaseBtn}>下單</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout
