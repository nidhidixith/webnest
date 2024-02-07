import React from 'react';
import { useNavigate } from 'react-router-dom';
import './trystep3.css'; // Import the CSS file for styling

const TryStep3 = ({ profileForm, handleInputChange, nextStep }) => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/trystep4');
  };

  return (
    <div className="step3-container">
    <div className="social-links-container">
    <h1>Step 3: Connect Your External Profiles</h1>
      <form>
        <label htmlFor="instagram">Instagram Profile</label>
        <input
          type="text"
          id="instagram"
          name="instagram"
          value={profileForm.instagram}
          onChange={handleInputChange}
        />

        <label htmlFor="facebook">Facebook Profile</label>
        <input
          type="text"
          id="facebook"
          name="facebook"
          value={profileForm.facebook}
          onChange={handleInputChange}
        />

        <label htmlFor="portfolioLink">Portfolio Link</label>
        <input
          type="text"
          id="portfolioLink"
          name="portfolioLink"
          value={profileForm.portfolioLink}
          onChange={handleInputChange}
        />

        <label htmlFor="externalLink">External Website Link</label>
        <input
          type="text"
          id="externalLink"
          name="externalLink"
          value={profileForm.externalLink}
          onChange={handleInputChange}
        />

        <div className="button-group">
          <button type="button" onClick={nextStep}>
            Next
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default TryStep3;


{/*const TryStep3 = ({ profileForm, handleInputChange, nextStep, skipStep }) => {
  return (
    <div className="social-links-container">
      <header>
        <h2>Step 5: Connect Your Social Profiles</h2>
      </header>
      <form>
        <label htmlFor="linkedin">LinkedIn Profile:</label>
        <input
          type="text"
          id="linkedin"
          name="linkedin"
          value={profileForm.linkedin}
          onChange={handleInputChange}
        />

        <label htmlFor="instagram">Instagram Profile:</label>
        <input
          type="text"
          id="instagram"
          name="instagram"
          value={profileForm.instagram}
          onChange={handleInputChange}
        />

        <div className="button-group">
          <button type="button" onClick={skipStep}>
            Skip for now
          </button>
          <button type="button" onClick={nextStep}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default TryStep3;*/}
