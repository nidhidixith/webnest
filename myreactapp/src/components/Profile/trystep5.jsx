import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './trystep5.css'; // Import the CSS file for styling

const TryStep5 = ({ profileForm,  handleFormSubmit }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/trystep5');
  };

  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    // You can add additional validation for the file type and size if needed
    setProfilePic(file);
  };

  return (
    <div className="step5-container">
    <div className="profile-picture-container">
      <h1>Step 5: Add a Profile Picture</h1>
      <form>
        <label htmlFor="profilePic">Upload Profile Picture:</label>
        <input
          type="file"

          accept="image/*"
          onChange={handleFileChange}
        />

        <p className="guidance">
          Choose a professional and engaging photo that represents you well.
        </p>

        <div className="button-group">
          <button type="button" onClick={(e) => {
        if(profilePic)
        {
            handleFormSubmit(e, profilePic);
        }
        else
        {
            handleFormSubmit(e);
        }
        }}>
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default TryStep5;



{/*const ProfilePictureStep = ({ profileForm, handleInputChange, nextStep, skipStep }) => {
  return (
    <div className="profile-picture-container">
      <header>
        <h2>Step 2: Add a Profile Picture</h2>
      </header>
      <form>
        <label htmlFor="profilePic">Upload Profile Picture:</label>
        <input
          type="file"
          id="profilePic"
          name="profilePic"
          accept=".jpg, .jpeg, .png"
          onChange={handleInputChange}
        />

        <p className="guidance">
          Choose a professional and engaging photo that represents you well.
        </p>

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

export default ProfilePictureStep;*/}