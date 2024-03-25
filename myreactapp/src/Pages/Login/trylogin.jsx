import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Index from '../Index/app';
import './trylogin.css';
import bgimage from '../../assets/bgimage.jpg';


const API_BASE_URL = 'http://localhost:8000/api/';

const TryLogin = ({ handleLoginClick, handleSignUpClick }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}login/`, { username, password });
      console.log('Login successful');
      const { token, message } = response.data;

      // Store the token securely (e.g., in local storage)
      localStorage.setItem('token', token);

      console.log('Received token:', token);
      console.log('Message:', message);

      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error.response.data.error);
      setError('Invalid credentials');
      //setIsModalOpen(true);
    }
  };

  return (
      <>
        <div className="form-LContainer">
            <h1>Login</h1>
            {error && <div className="login-error-message">{error}</div>}
            <div className="login-group">
               <label>Username:</label>
               <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button onClick={handleLogin}>Login</button>
            </div>

            <div className="login-signup-container">
              <p>Don't have an account? Click here to</p>
                 <a href="#" onClick={() => { handleSignUpClick(); handleLoginClick(); }}>Signup</a>
            </div>
        </div>
        </>
  );
};

export default TryLogin;