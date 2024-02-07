import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../../components/BaseLayout/baselayout';
import './trylogin.css';
import bgimage from '../../assets/bgimage.jpg';


const API_BASE_URL = 'http://localhost:8000/api/';

const TryLogin = ({ isShowLogin, handleLClick }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  //console.log("isShowLogin of trylogin.jsx:",isShowLogin);

  const handleClose = () => {
       navigate('/');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}login/`, { username, password });
      console.log('Login successful');
      const { token, message } = response.data;

      // Store the token securely (e.g., in local storage)
      localStorage.setItem('token', token);

      console.log('Received token:', token);
      console.log('Message:', message);

      navigate('/posts');
    } catch (error) {
      console.error('Error during login:', error.response.data.error);
      setError('Invalid credentials');
      //setIsModalOpen(true);
    }
  };

  return (

      <div className="outer-login-container">
      <>
      <div className="outer-LContainer">
        <div className="login-image-container">
            <img src={bgimage} id="login-image"/>
        </div>

        <div className="form-LContainer">
          {error && <div className="error-message">{error}</div>}

          <button className="close-button" onClick={handleClose}>
          <span>&times;</span>
          </button>

          <h1>Login</h1>

          <div className="login-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="button-container">
            <button onClick={handleLogin}>Login</button>
          </div>
          </div>

          <div className="login-signup-container">
          <p>Don't have an account? Click here to</p>
          <a href="/trysignup">Signup</a>
          </div>

        </div>
        </div>
        </>
        </div>
  );
};

export default TryLogin;