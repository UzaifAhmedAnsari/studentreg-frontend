// src/contexts/AuthProvider.jsx
import { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // *** LOGIN REDIRECTION CHANGE START ***
      // Login ke baad ab seedha homepage par redirect karein
      navigate('/'); 
      // Agar aap chahte hain ki role-based dashboard par jaye, to neeche wala switch statement use kar sakte hain
      /*
      switch (response.data.role) {
        case 'Admin':
          navigate('/admin/dashboard');
          break;
        case 'Instructor':
          navigate('/instructor/dashboard');
          break;
        case 'Student':
          navigate('/student/dashboard');
          break;
        default:
          navigate('/');
      }
      */
      // *** LOGIN REDIRECTION CHANGE END ***
      
      toast.success(`Welcome, ${response.data.name}!`);
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await api.post('/auth/register', { name, email, password, role });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // Signup ke baad seedha homepage par redirect karein
      navigate('/'); 

      toast.success('Registration successful! Welcome to StudentReg.');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed.';
      toast.error(message);
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
