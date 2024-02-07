import React from 'react';
import { useNavigate } from 'react-router-dom';
import './trystep1.css';  // Import the CSS file for styling
import logoimage from '../../assets/bgimage.jpg';  // Import the logo-image

const TryStep1 = ({ nextStep }) => {
  const navigate = useNavigate();

  return (
    <div className="step1-container">
    <div className="welcome-container">
      <h1>Welcome to Artists-Central!</h1>
      <div className="content">
        <p>
          We're thrilled to have you join our Artists-Central, the ultimate hub for artists and content creators from various domains.
          Completing your profile is the first step towards unlocking a world of opportunities and connections.
        </p>
        <p>
          Your profile is your canvas – a space to showcase your talents, passions, and creativity. By completing your profile, you not only enhance your visibility but also connect with like-minded individuals, potential collaborators, and fans who appreciate your unique skills.
        </p>
        <p>
          Take this opportunity to tell your story, highlight your expertise, and build a network that extends beyond boundaries. Whether you're a painter, influencer, singer, dancer, chef, photographer, or any other type of artist, Your Platform Name is here to support and celebrate your artistic journey.
        </p>
        <p className="cta">
          Let's get started! Click 'Next' to begin shaping your artistic presence on Artists-Central. Your creative community awaits!
        </p>
      </div>
      <button onClick={nextStep}>Next</button>
    </div>
    </div>
  );
};

export default TryStep1;
