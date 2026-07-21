import React from 'react';
import {NavLink} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {LogOut} from '../utils/auth.jsx';
import api from '../../api.js';

const Sidebar = () => { 

    const navigate = useNavigate();
    const handleLogout = async () => {
    
    try {
      await api.post('/auth/logout', {}, {
        withCredentials: true
      }); // Make an API call to log out the user
       localStorage.removeItem('auth_token'); // Remove the auth token from local storage
    } catch (error) {
      console.error('Error occurred while logging out:', error);
    }
   
    LogOut();
    navigate('/login');
  };


    return ( 
        <div className="w-64 shrink-0 bg-gray-900 text-white  p-6 space-y-6 animate-fade-in-left">
            <h1 className="text-2xl font-bold mb-8">Employee Dashboard</h1>
            <nav className=" flex flex-col space-y-4">
                <NavLink to="" className="hover:bg-gray-700 p-2  rounded">Home</NavLink>
                <NavLink to="tasks" className="hover:bg-gray-700 p-2 rounded">Tasks</NavLink>
                <NavLink to="attendance" className="hover:bg-gray-700 p-2 rounded">Attendance</NavLink>
                <NavLink to="profile" className="hover:bg-gray-700 p-2 rounded">Profile</NavLink>
                
            </nav>
            <button onClick={handleLogout} 
            className="mt-8 bg-red-600 hover:bg-red-700 p-2 rounded w-full">Logout</button>
        </div>
    );
};

export default Sidebar;