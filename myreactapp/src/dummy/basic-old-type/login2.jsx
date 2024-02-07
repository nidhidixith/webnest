import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

const Login = () => {
      <h1>Login</h1>
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');


      const handleLogin = async () => {
      try {
        await axios.post(`${API_BASE_URL}login/`, { username, password });
        console.log('Login successful');
      } catch (error) {
      console.error('Error during login:', error.response.data.error);
    }
  };

  return (

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
  );
};

export default Login;












