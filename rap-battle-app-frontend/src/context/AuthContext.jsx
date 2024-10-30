// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for token in localStorage when the app loads
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Sets isAuthenticated based on token existence
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true); // Updates state after login
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
