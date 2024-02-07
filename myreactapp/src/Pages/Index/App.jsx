import React, { useState } from 'react';
import './app.css';
import Navbar from '../../components/Navbar/navbar.jsx'
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
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(true);

  const handleSignUpClick = () => {
      setIsSignUpClicked(!isSignUpClicked);
  };

  const handleLoginClick = () => {
      setIsLoginClicked(!isLoginClicked);
  };

  return (
      <div className="app-container">
          <Navbar/>
          <div className="app-bottom-container">
              <div className="app-text-container">
                  <div className="text1-container">
                    <p>Welcome to the Artists Central – a vibrant online space where creators connect, collaborate, and thrive.</p>
                  </div>

                  <div className="text2-container">
                    <p>Join us to amplify your artistic journey, build meaningful relationships, and explore endless possibilities in the world of creativity.</p>
                  </div>
              </div>
              <div className="app-signup-container">
                   {(isSignUpClicked) ?  <TrySignUp handleSignUpClick={handleSignUpClick} handleLoginClick={handleLoginClick}/> : ""}
                   {(isLoginClicked) ?  <TryLogin handleLoginClick={handleLoginClick} handleSignUpClick={handleSignUpClick}/> : ""}
              </div>
          </div>
     </div>
  );
};

export default Index;