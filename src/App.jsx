// 樣式 (css)
import './assets/css/global.css'
import './assets/css/font.css'
// 函式庫 (library)
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// 佈局組件
import Layout from './layouts/Layout'
// 頁面 (pages)
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
