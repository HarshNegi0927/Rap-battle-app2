// src/Main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';  // Import LoginPage component
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />  {/* New Login Route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
