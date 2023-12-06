import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './Pages/Index/App.jsx'
import Paths from './routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Paths />
  </React.StrictMode>,
)
