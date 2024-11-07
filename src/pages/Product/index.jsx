// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProduct } from '../../api/request/product'
import { postUserCart } from '../../api/request/user'
// 自訂函式 (custom function)
import { useMessage } from '../../context/MessageContext'
import useRedux from '../../hooks/useRedux'

// 賣家中心
function Product() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [stock, setStock] = useState(1)
  const { setSucMsg } = useMessage()
  const { setAuth, user } = useRedux()

  useEffect(() => {
    const onGetProduct = async () => {
      try {
        const response = await getProduct(productId)
        console.log('Receive [get /product] response:', response.message)
        console.log('Receive [get /product] data:', response.product)
        setProduct(response.product)
        setStock(1)
      } catch (error) {
        console.error('Catch [get /product] error:', error.message)
      }
    }

    if (productId) {
      onGetProduct()
    }
  }, [productId])

  const onAddCart = async () => {
    try {
      const response = await postUserCart(productId, stock, product.price)
      console.log('Receive [post /user/cart/:productId] response:', response.message)
      console.log('Receive [post /user/cart/:productId] data:', response.cartItems)
      
      setAuth({ user: { ...user, cart: { ...user.cart, items: response.cartItems } } })
      setSucMsg(response.message)
    } catch (error) {
      console.error('Catch [post /user/cart/:productId] error:', error.message)
    }
  }

  const handleIncrement = () => {
    if (stock < product?.stock) {
      setStock(stock + 1)
    }
  }

  const handleDecrement = () => {
    if (stock > 1) {
      setStock(stock - 1)
    }
  }

  return (
    <main className={S.main}>
      <div className={S.productContainer}>
        <div className={S.productImage}>
          <img className={S.image} src={product?.image?.link} />
        </div>
        <div className={S.productData}>
          <h1>{product?.name}</h1>
          <p>價格: ${product?.price}</p>
          <div className={S.stockCountContainer}>
            {user && (
              <div className={S.stockCount}>
                <button
                  className={S.countBtn}
                  type="button"
                  onClick={handleDecrement}
                  disabled={stock <= 1}
                >
                  -
                </button>
                <input className={S.stock} value={stock} readOnly />
                <button
                  className={S.countBtn}
                  type="button"
                  onClick={handleIncrement}
                  disabled={stock >= product?.stock}
                >
                  +
                </button>
              </div>
            )}
            <span className={S.stockLeft}>還剩{product?.stock}件</span>
          </div>
          <p>{product?.description}</p>
          {user && (
            <div className={S.purchase}>
              <button className={S.addToCart} onClick={onAddCart}>
                加到購物車
              </button>
              <button className={S.directPurchase}>直接購買</button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Product
