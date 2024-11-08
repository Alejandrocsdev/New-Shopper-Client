// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
// import { useState, useEffect } from 'react'
// 自訂函式 (custom function)
// import useRedux from '../../../hooks/useRedux'
// import { useMessage } from '../../../context/MessageContext'
// import { deleteUserCart } from '../../../api/request/user'

// 購物紀錄
function History() {
  // const { setSucMsg } = useMessage()
  // const { setAuth, user } = useRedux()
  // const [cartItems, setCartItems] = useState([])

  // useEffect(() => {
  //   if (user?.cart?.items) {
  //     console.log(user?.cart?.items)
  //     setCartItems(user?.cart?.items)
  //   }
  // }, [user?.cart?.items])

  // const onRemoveCart = async (productId) => {
  //   try {
  //     const response = await deleteUserCart(productId)
  //     console.log('Receive [delete /user/cart/:productId] response:', response.message)
  //     console.log('Receive [delete /user/cart/:productId] data:', response.cartItems)
  //     setAuth({ user: { ...user, cart: { ...user.cart, items: response.cartItems } } })
  //     setSucMsg(response.message)
  //   } catch (error) {
  //     console.error('Catch [delete /user/cart/:productId] error:', error.message)
  //   }
  // }

  return (
    <>
      <div className={S.header}>購物紀錄</div>
      <div className={S.infoContainer}>
        <div className={S.cartItems}>
          {/* {cartItems.map((cartItem, index) => (
            <div key={index} className={S.cartItem}>
              <div className={S.imgContainer}>
                <img src={cartItem.product.image.link} className={S.image} />
              </div>
              <div className={S.dataContainer}>
                <div className={S.productName}>{cartItem.product.name}</div>
                <div className={S.productPrice}>${cartItem.product.price}</div>
                <div className={S.quantity}>數量: {cartItem.quantity}</div>
                <div className={S.deleteBtn} onClick={() => onRemoveCart(cartItem.productId)}>
                  刪除
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </>
  )
}

export default History
