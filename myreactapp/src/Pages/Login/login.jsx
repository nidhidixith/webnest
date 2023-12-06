import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../../components/BaseLayout/baselayout';
import './login.css';
const API_BASE_URL = 'http://localhost:8000/api/';

const Login = () => {

      const navigate = useNavigate();
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      const handleLogin = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}login/`, { username, password });
        console.log('Login successful');
        const { token, message } = response.data;

        // Store the token securely (e.g., in local storage)
        localStorage.setItem('token', token);

        console.log('Received token:', token);
        console.log('Message:', message);

        navigate('/success');
      } catch (error) {
      console.error('Error during login:', error.response.data.error);
    }
  };

  return (
    <>
      <div className="login-container">
        <BaseLayout></BaseLayout>
        <div className="login-form">
          <div className="heading">
          <h2>Login</h2>
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

           <div className="button-container">
          <button onClick={handleLogin}>Login</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Login;





{/*
    <>
    <BaseLayout></BaseLayout>
    <div>
      <h1>User Login</h1>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button onClick={handleLogin}>Login</button>

    </div>
    </>
    */}






