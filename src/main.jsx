import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import AppStore from './Redux/store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={AppStore} basename="/ecommerce-react">
    <App />
    </Provider>
  </StrictMode>,
)
