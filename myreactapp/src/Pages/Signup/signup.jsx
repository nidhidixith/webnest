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
  const [emailError, setEmailError] = useState('');
  const [emailExistsError, setEmailExistsError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    try {
      if (!validateEmail(username)) {
        setEmailError('Please enter a valid email address');
        setEmailExistsError(''); // Clear existing error message
        return;
      }

      const response = await axios.post(`${API_BASE_URL}signup/`, { username, password });
      console.log('Signup successful');

      const { token, message } = response.data;

      // Store the token securely (e.g., in local storage)
      localStorage.setItem('token', token);

      console.log('Received token:', token);
      console.log('Message:', message);

      navigate('/profile');
    } catch (error) {
      console.error('Error during signup:', error.response.data.error);
      setEmailExistsError('Email ID already exists');
      setEmailError(''); // Clear existing error message
    }
  };

  return (
    <>
      <BaseLayout></BaseLayout>
      <div className="signup-container">
        <div className="heading">
        <h2>Create your account</h2>
        </div>
        {emailError && <p className="error-message">{emailError}</p>}
        {emailExistsError && <p className="error-message">{emailExistsError}</p>}
        <div className="signup-form">



          <div className="form-group">
            <label>Email address:</label>
            <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />

          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div>
            <p className="login-click">
              Already have an account?<a className="login-click" href="/login">
                Login
              </a>
            </p>
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
