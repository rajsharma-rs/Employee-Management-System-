import React from 'react';

const STORAGE_KEY = "auth_token";

export const loginDummy = (email) => {
    const user = {
        name: email.split('@')[0], // Extract name from email
        email: email,
        role: "employee",
        token: "dummy_auth_token_123456"
    };

    const admin = [
     {
        name: email.split('@')[0], // Extract name from email
        email: "rsharma37852@gmail.com",
        role: "admin",
        token: "dummy_auth_token_123456"
    },
    {
        name: email.split('@')[0], // Extract name from email
        email: "heyyamay@gmail.com",
        role: "admin",
        token: "dummy_auth_token_123456"

    }
];

const isAdmin = admin.some(adminUser => adminUser.email === email);
console.log("Is Admin:", isAdmin);
if (isAdmin) {
    user.role = "admin";
}
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