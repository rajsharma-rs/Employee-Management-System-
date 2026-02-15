import React from 'react';
import {NavLink} from 'react-router-dom';

const Sidebar = () => { 
    return ( 
        <div className="w-64 shrink-0 bg-gray-900 text-white  p-6 space-y-6 animate-fade-in-left">
            <h1 className="text-2xl font-bold mb-8">Employee Dashboard</h1>
            <nav className=" flex flex-col space-y-4">
                <NavLink to="" className="hover:bg-gray-700 p-2  rounded">Home</NavLink>
                <NavLink to="tasks" className="hover:bg-gray-700 p-2 rounded">Tasks</NavLink>
                <NavLink to="attendance" className="hover:bg-gray-700 p-2 rounded">Attendance</NavLink>
                <NavLink to="profile" className="hover:bg-gray-700 p-2 rounded">Profile</NavLink>
                <NavLink to="settings" className="hover:bg-gray-700 p-2 rounded">Settings</NavLink> 
            </nav>
            
        </div>
    );
};

export default Sidebar;