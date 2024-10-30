// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token } = response.data;
            login(token); // Use login to set token and update isAuthenticated
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <header className="text-center mb-8">
                <h1 className="text-5xl font-extrabold text-white">
                    EDUVERSE
                </h1>
                <p className="text-lg text-gray-300">Best Teacher | Affordable Pricing | Exclusive Notes</p>
            </header>
            <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-md border border-cyan-500">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-cyan-500 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-cyan-500 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-md hover:opacity-90 transition duration-200">
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-300">Other login options</p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <FaGoogle className="h-6 w-6 text-gray-300 cursor-pointer hover:text-blue-500 transition duration-200" />
                        <FaFacebook className="h-6 w-6 text-gray-300 cursor-pointer hover:text-blue-600 transition duration-200" />
                        <FaGithub className="h-6 w-6 text-gray-300 cursor-pointer hover:text-gray-800 transition duration-200" />
                    </div>
                </div>
                <Link to="/forgot-password" className="block text-center mt-4 text-lg font-bold text-white hover:underline">
                    Forgot Password?
                </Link>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-300">
                        Don't have an account?{' '}
                        <Link to="/" className="text-cyan-400 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
