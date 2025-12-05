
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LOGO_URL, ADMIN_EMAIL, ADMIN_PASSWORD } from '../constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        login(email);
        navigate('/admin');
    } else {
        setError('Invalid email or password. Please use correct admin credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-green-50 mb-4 shadow-sm">
            <img src={LOGO_URL} alt="JFCIN Logo" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500">Sign in to the JFCIN Admin Portal</p>
        </div>

        {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg">
                {error}
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@jfcin.org.ng"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-jfcin-primary text-white py-3 rounded-lg font-bold hover:bg-jfcin-dark transition-colors shadow-lg shadow-green-200"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-400">
            <p>Admin Access Only</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
