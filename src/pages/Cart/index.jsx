// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useEffect } from 'react'
// 自訂函式 (custom function)
import useRedux from '../../hooks/useRedux'
import { useMessage } from '../../context/MessageContext'
import { putUserCart, deleteUserCart } from '../../api/request/user'
// 組件 (component)
import StockCount from '../../components/UI/StockCount'
import Anchor from '../../components/Element/Anchor'

// 購物車
function Cart() {
  const { setSucMsg } = useMessage()
  const { setAuth, user } = useRedux()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    if (user?.cart?.items) {
      setCartItems(user?.cart?.items)
    }
  }, [user?.cart?.items])

  const onRemoveCart = async productId => {
    try {
      const response = await deleteUserCart(productId)
      console.log('Receive [delete /user/cart/:productId] response:', response.message)
      console.log('Receive [delete /user/cart/:productId] data:', response.cartItems)
      setAuth({ user: { ...user, cart: { ...user.cart, items: response.cartItems } } })
      setSucMsg(response.message)
    } catch (error) {
      console.error('Catch [delete /user/cart/:productId] error:', error.message)
    }
  }

  const onUpdateCart = async (productId, quantity) => {
    try {
      const response = await putUserCart(productId, quantity)
      console.log('Receive [put /user/cart/:productId] response:', response.message)
      console.log('Receive [put /user/cart/:productId] data:', response.cartItems)
      setAuth({ user: { ...user, cart: { ...user.cart, items: response.cartItems } } })
      setCartItems(response.cartItems)
    } catch (error) {
      console.error('Catch [put /user/cart/:productId] error:', error.message)
    }
  }

  const totalAmount = cartItems.reduce((sum, cartItem) => {
    return sum + cartItem.product.price * cartItem.quantity
  }, 0)

  return (
    <main className={S.main}>
      <div className={S.container}>
        <div className={S.content}>
          <div className={S.header}>購物車</div>
          <div className={S.infoContainer}>
            <div className={S.cartItems}>
              {cartItems.length === 0 ? (
                <div className={S.emptyMessage}>購物車是空的</div>
              ) : (
                cartItems.map((cartItem, index) => (
                  <div key={index} className={S.cartItem}>
                    <div className={S.imgContainer}>
                      <img src={cartItem.product.image.link} className={S.image} />
                    </div>
                    <div className={S.dataContainer}>
                      <div className={S.productName}>{cartItem.product.name}</div>
                      <div className={S.productPrice}>${cartItem.product.price}</div>

                      <div className={S.quantity}>
                        <StockCount
                          stock={cartItem.quantity}
                          setStock={newStock => onUpdateCart(cartItem.productId, newStock)}
                          totalStock={cartItem.product.stock}
                        />
                      </div>
                      <div className={S.deleteBtn} onClick={() => onRemoveCart(cartItem.productId)}>
                        刪除
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length !== 0 && (
              <div className={S.purchase}>
                <span className={S.purchaseAmount}>
                  總金額:<span>${totalAmount}</span>
                </span>
                <Anchor int="/checkout">
                  <button className={S.purchaseBtn}>結帳</button>
                </Anchor>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Cart
