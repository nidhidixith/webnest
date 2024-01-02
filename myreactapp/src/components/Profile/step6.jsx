import React, { useState } from 'react';
import './profile.css';

const Step6 = ({ profileForm, handleInputChange, prevStep, handleFormSubmit }) => {
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    // You can add additional validation for the file type and size if needed
    setProfilePic(file);
  };

  return (
    <>
      <div className="step-container">
        <label>
          Profile Picture:
          <input type="file" accept="image/*"  onChange={handleFileChange} />
        </label>
        <br />
      </div>

      <div className="pagination-container">
        <button className="pagination-button" onClick={prevStep}>
          Previous
        </button>
        <button className="pagination-button" onClick={(e) => {
        if(profilePic)
        {
            handleFormSubmit(e, profilePic);
        }
        else
        {
            handleFormSubmit(e);
        }
        }}>
          Complete Profile
        </button>
      </div>

    </>
  );
};

export default Step6;