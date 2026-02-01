import React from 'react';

const STORAGE_KEY = "auth_token";

export const loginDummy = () => {
    const user = {
        name: "John Doe",
        email: "john@gmail.com",
        role: "employee",
        token: "dummy_auth_token_123456"
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    
};
export const LogOut = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const isLoggedIn = () => {
    return !!localStorage.getItem(STORAGE_KEY) ;
};

export const getUserInfo = () => {
    const user = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

export default {
    loginDummy,
    LogOut,
    isLoggedIn,
    getUserInfo
};