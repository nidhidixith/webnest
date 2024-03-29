// Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const handleLogout = async () => {
    const navigate = useNavigate();
    try {

      const token = localStorage.getItem('token');
      console.log('Received token:', token);

      localStorage.removeItem('token');
      console.log('Removed Token:', token);

      alert('You are logged out');

      navigate('/app'); // Navigate to the home page after successful logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
};

export default handleLogout;


