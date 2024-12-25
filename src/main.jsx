import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
//to navigate among pages
import CoinContextProvider from './context/CoinContext.jsx'
// api to fetch the real time coin details

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <CoinContextProvider>
            <App />
        </CoinContextProvider>
    </BrowserRouter>,
)
 