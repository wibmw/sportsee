import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './layout/Header'
import Home from './pages/Home'

import './style/style.css'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
