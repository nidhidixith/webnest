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

        navigate('/success');
      } catch (error) {
      console.error('Error during login:', error.response.data.error);
      setError('Invalid credentials');
    }
  };

  return (
    <>
       <BaseLayout></BaseLayout>

      <div className="login-container">
      <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="login-form">
          <div className="heading">

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







