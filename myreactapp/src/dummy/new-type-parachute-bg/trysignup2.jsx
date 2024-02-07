import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BaseLayout from '../../components/BaseLayout/baselayout';
import './trysignup.css';
import { useNavigate } from 'react-router-dom';
import signupimage from '../../assets/signupimage.jpg';
import { TypeAnimation } from 'react-type-animation';

const API_BASE_URL = 'http://localhost:8000/api/';

const TrySignup = ({ isShowSignUp, handleSClick, onClose }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailExistsError, setEmailExistsError] = useState('');

  //console.log("isShowSignUp of trysignup.jsx:",isShowSignUp);
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

      navigate('/profile');
    } catch (error) {
      console.error('Error during signup:', error.response.data.error);
      setEmailExistsError('Email ID already exists');
      setEmailError(''); // Clear existing error message
    }
  };

  return (

      <div className="outer-signup-container">
      <>
      <div className="outer-SContainer">
      <div className="signup-left-container">
        <div className="text-container">
            <p>Art Crib</p>
            <p>Welcome!</p>
            <p>Step into the world of Artists</p>
        </div>
        <div className="typing-paragraph">
            <TypeAnimation
             sequence={[
            `Shape your profile,bond with fellow creators.`,
               1000,
              "",
            ]}
                speed={20}
                style={{
                whiteSpace: 'pre-line',
                fontSize: '16px',
                color: 'white',

                marginLeft: '30px',
            }}
            repeat={Infinity}
            />
        </div>
      </div>

      <div className="form-SContainer">
           {emailError && <p className="error-message">{emailError}</p>}
           {emailExistsError && <p className="error-message">{emailExistsError}</p>}

          <button className="close-button" onClick={handleClose}>
          <span>&times;</span>
          </button>

        <h1>Sign Up</h1>

        <div className="signup-group">

            <input type="email" value={username} placeholder="Enter your Email address" onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />


          <div className="button-container">
            <button onClick={handleSignup}>Sign Up</button>
          </div>
        </div>

          <div className="signup-login-container">
            <p>Already have an account?</p>
            <a href="/trylogin">Login</a>
          </div>
        </div>
        </div>
        </>
    </div>

  );
};

export default TrySignup;
