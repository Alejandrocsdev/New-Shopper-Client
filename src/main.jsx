// 函式庫 (library)
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
// 自訂函式 (custom function)
import App from './App.jsx'
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
