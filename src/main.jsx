import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// 自訂函式 (custom function)
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
