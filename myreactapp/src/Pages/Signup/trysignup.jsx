import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BaseLayout from '../../components/BaseLayout/baselayout';
import './trysignup.css';
import { useNavigate } from 'react-router-dom';
import signupimage from '../../assets/signupimage.jpg';
import { TypeAnimation } from 'react-type-animation';

const API_BASE_URL = 'http://localhost:8000/api/';

const TrySignup = ({ handleSignUpClick, handleLoginClick }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailExistsError, setEmailExistsError] = useState('');

  const handleClose = () => {
       navigate('/');
  };

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

      navigate('/tryprofile');
    } catch (error) {
      console.error('Error during signup:', error.response.data.error);
      setEmailExistsError('Email ID already exists');
      setEmailError(''); // Clear existing error message
    }
  };

  return (
      <>
      <div className="form-SContainer">
          <h1>Sign Up</h1>
           {emailError && <p className="signup-error-message1">{emailError}</p>}
          {emailExistsError && <p className="signup-error-message2">{emailExistsError}</p>}
          <div className="signup-group">

            <input type="email" value={username} placeholder="Enter your Email address" onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />

            <div className="button-container">
              <button onClick={handleSignup}>Sign Up</button>
            </div>
          </div>

          <div className="signup-login-container">
            <p>Already have an account?</p>
            <a href="#" onClick={() => { handleLoginClick(); handleSignUpClick();}}>Login</a>
          </div>
      </div>
      </>
  );
};

export default TrySignup;
