import React from 'react'
import Sidebar from './sidebar.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import {LogOut , getUserInfo} from '../utils/auth.jsx';


const EmployeeLayout = () => {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    LogOut();
    navigate('/login');
  };
  return (
    <div className='flex gap-2 h-screen'>
      <Sidebar />
      <main className='flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8'>
        <Outlet />
      </main>
    </div>
  )
}

export default EmployeeLayout