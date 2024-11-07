// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useState, useEffect } from 'react'
// 自訂函式 (custom function)
import { getProducts } from '../../api/request/product'
// 組件 (component)
import Paginator from './Paginator'

// 首頁
function Home() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 9

  useEffect(() => {
    const onGetProducts = async () => {
      try {
        const response = await getProducts({ page: currentPage, limit })
        console.log('Receive [get /product] response:', response.message)
        console.log('Receive [get /product] data:', response.data)
        const { totalItems, totalPages, products } = response.data
        setProducts(products)
        setTotalPages(totalPages)
      } catch (error) {
        console.error('Catch [get /product] error:', error.message)
      }
    }
    onGetProducts()
  }, [currentPage])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <main className={S.main}>
      <div className={S.productsContainer}>
        {products.map((product, index) => (
          <div className={S.product} key={index}>
            <div className={S.imgContainer}>
              <img className={S.image} src={product.image.link} />
            </div>
            <div className={S.name}>{product.name}</div>
            <div className={S.category}>{product.category}</div>
            <div className={S.price}>${product.price}</div>
          </div>
        ))}
      </div>
      <Paginator
        currentPage={currentPage}
        totalPage={totalPages}
        onPageChange={handlePageChange}
        showPages={3}
      />
    </main>
  )
}

export default Home
