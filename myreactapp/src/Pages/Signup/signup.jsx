
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import BaseLayout from '../../components/BaseLayout/baselayout';
import './signup.css';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api/';

const Signup = () => {

      const navigate = useNavigate();
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [email, setEmail] = useState('');

   const handleSignup = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}signup/`, { username, password, email });
        //const token = response.data.token;  // Fetch the token from the response
        console.log('Signup successful');
        //console.log(status)

        const { token, message } = response.data;

        // Store the token securely (e.g., in local storage)
        localStorage.setItem('token', token);

        console.log('Received token:', token);
        console.log('Message:', message);

        navigate('/profile');
    } catch (error) {
        console.error('Error during signup:', error.response.data.error);
    }
    };

  return (
  <>
      <div className="signup-container">
        <BaseLayout></BaseLayout>

        <div className="signup-form">
          <div className="heading">
          <h2>Create your account</h2>
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
          <p className="login-click"> Already have an account?<a className="login-click" href="/login">Login</a></p>
          </div>

           <div className="button-container">
          <button onClick={handleSignup}>Sign Up</button>
            </div>
        </div>
      </div>

    </>

  );
};

export default Signup;

{/*
  <>
    <BaseLayout></BaseLayout>
    <div>

      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <button onClick={handleSignup}>Sign Up</button>

    </div>
    </>
  */}

