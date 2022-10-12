import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/static/header/Header'
import Home from './pages/home/Home'
import Error from './pages/error/Error'

import './style/style.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        {/** *********** Error Page ******************/}
        <Route path={'*'} element={<Error />} />
        {/** *********** Homepage with params ******************/}
        <Route path={'/:id'} element={<Home />} />
        {/** *********** Homepage without params ******************/}
        <Route path={'/'} element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
