// 函式庫 (library)
import { Outlet } from 'react-router-dom'
// 自訂函式 (custom function)
import { LangProvider } from '../context/LangContext'

const LangRoutes = () => {
  return (
    <LangProvider>
      <Outlet />
    </LangProvider>
  )
}

export default LangRoutes
