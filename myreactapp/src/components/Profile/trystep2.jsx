import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './trystep2.css';  // Import the CSS file for styling

const TryStep2 = ({ profileForm, handleInputChange, nextStep }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    first_name: '',
    //last_name: '',
    date_of_birth: '',
    bio: '',
  });

  const validateForm = () => {
    const newErrors = {
      first_name: '',
      //last_name: '',
      date_of_birth: '',
      bio: '',
    };

    if (!profileForm.first_name.trim()) {
      newErrors.first_name = 'This field is required';
    }

    /*if (!profileForm.last_name.trim()) {
      newErrors.last_name = 'This field is required';
    }*/

    if (!profileForm.date_of_birth.trim()) {
      newErrors.date_of_birth = 'This field is required';
    }

    if (!profileForm.bio.trim()) {
      newErrors.bio = 'This field is required';
    }

    setErrors(newErrors);

    // Check if there are no errors
    return Object.values(newErrors).every((error) => !error);
  };

  const handleNextClick = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="step2-container">
      <div className="basic-info-container">
        <h1>Step 1: Basic Information</h1>
        <form>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="first_name"
            value={profileForm.first_name}
            onChange={handleInputChange}
          />
          <div className="error-message">{errors.first_name}</div>

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="last_name"
            value={profileForm.last_name}
            onChange={handleInputChange}
          />

          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="date_of_birth"
            value={profileForm.date_of_birth}
            onChange={handleInputChange}
          />
          <div className="error-message">{errors.date_of_birth}</div>

          <label htmlFor="bio">Bio/Description</label>
          <textarea
            id="bio"
            name="bio"
            value={profileForm.bio}
            onChange={handleInputChange}
          />
          <div className="error-message">{errors.bio}</div>

          <div className="button-group">
            <button type="button" onClick={handleNextClick}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TryStep2;
