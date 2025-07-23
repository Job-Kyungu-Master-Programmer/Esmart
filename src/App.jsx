import { useState } from 'react'
import Navbar from './components/common/Navbar'
// import Dashboard from './components/sidebars/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Sidebar from './components/sidebars/Sidebar'
import ProfileDashboard from './components/profiles/ProfileDashboard'
import CreateManageCard from './components/profiles/ProfileManage'
import ProfileViewer from './components/profiles/ProfileViewer'


const App = () => {
   return (
      <div className="app">
          <Navbar />
          <div className="app__main">
            <Sidebar />
            <div className="app__routes">
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/dashboard-particular' element={<ProfileDashboard />} />
                  <Route path='/profile-manager' element={<CreateManageCard />} />
                  <Route path='/profileviewer' element={<ProfileViewer />} />
              </Routes>
            </div>
          </div>
      </div>
   )
}

export default App
