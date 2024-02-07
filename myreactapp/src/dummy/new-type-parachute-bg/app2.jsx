import React, { useState } from 'react';
import BaseLayout from '../../components/BaseLayout/baselayout';
import './app.css';
import image1 from '../../assets/image1.jpg';
import image4 from '../../assets/image4.jpg';
import image5 from '../../assets/image5.jpg';
import image8 from '../../assets/image8.jpg';
import image9 from '../../assets/image9.jpg';
import TryLogin from '../Login/trylogin';
import TrySignUp from '../Signup/trysignup';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleClick = () => {
       navigate('/trylogin');
  };
  return (
    <>
      <div className="nav-bar">
          <a href="/">HOME</a>
          <a href="#">ABOUT</a>
          <a href="#">CONTACT</a>
          <a href="/trysignup">REGISTER</a>
          <a href="/trylogin">LOGIN</a>
      </div>

      <div className="text1-container">
      <p>Welcome to the Artists Central – a vibrant online space where creators connect, collaborate, and thrive.</p>
      </div>

      <div className="text2-container">
      <p>Join us to amplify your artistic journey, build meaningful relationships, and explore endless possibilities in the world of creativity.</p>
      </div>

       <button type="submit" className="button" onClick={handleClick}>Get Started</button>

      {/*
      <div className="images-container">
         <img src={image1} id="image1"/>
         <img src={image4} id="image4"/>
         <img src={image5} id="image5"/>
         <img src={image8} id="image8"/>
         <img src={image9} id="image9"/>
      </div>
      */}
    </>
  );
};

export default Index;