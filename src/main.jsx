import React from 'react'
import { BrowserRouter as Router } from  'react-router-dom'
import { createRoot } from 'react-dom/client'
import './assets/styles/main.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
