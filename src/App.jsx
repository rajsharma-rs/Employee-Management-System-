import React from 'react'
import EmployeeLayout from './components/employe dashboard/employelayout.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/home.jsx'
import Login from './components/login.jsx'
import Tasks  from './Pages/Tasks.jsx'
import Profile from './Pages/Profile.jsx'
import Attendance from './Pages/Attendance.jsx'
import Settings from './Pages/Setting.jsx'
import Signup from './components/employe dashboard/Signup.jsx'
import EMSLandingPage from './components/employe dashboard/Landingpage.jsx'
import ProtectedRoute from './components/utils/ProtectedRoute.jsx'
const App = () => {
  return (
    
      <div className='bg-slate-900 w-full min-h-screen m-0 p-0'>
      

      <Routes>
        <Route path='/' element={<EMSLandingPage />} />
        <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        <Route path='/employee' element={<ProtectedRoute><EmployeeLayout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path='Tasks' element={<Tasks />} />
          <Route path='attendance' element={<Attendance />} />
          <Route path='profile' element={<Profile />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App