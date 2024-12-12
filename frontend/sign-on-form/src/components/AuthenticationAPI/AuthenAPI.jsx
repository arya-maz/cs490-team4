//task 7: Integrate Frontend with Authentication API

import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Login Function
export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8000/api/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token); // Save JWT to localStorage
    console.log('Login successful:', token);
    return true;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    return false;
  }
};

// Register Function
export const register = async (username, email, password) => {
  try {
    const response = await axios.post('http://localhost:8000/api/signup', { username, email, password });
    console.log('Registration successful:', response.data);
    return true;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    return false;
  }
};

// Custom Hook for Logout
export const useLogout = () => {
  const navigate = useNavigate(); // Initialize useNavigate inside the custom hook
  
  const logout = () => {
    localStorage.removeItem('token'); // Clear JWT
    console.log('Logged out successfully.');
    navigate('/login'); // Redirect to login page
  };

  return { logout };
};

// Check Authentication
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Check if token exists
};

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();  // Using useNavigate instead of Navigate
  
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');  // Redirect to login using navigate
    return null;  // Return null while redirecting
  }
  
  return children; // Render protected content if authenticated
};
