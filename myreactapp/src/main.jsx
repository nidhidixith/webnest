import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './Pages/Index/App.jsx'
import Paths from './routes.jsx'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Paths />
  </React.StrictMode>,
)
