import React, { useState, useEffect } from 'react';
import BaseLayout from '../BaseLayout/baselayout';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api/';

const UserProfileCompletion = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    link: '',
    bio: '',
    date_of_birth: '',
    profile_pic: null,  // Use null for the profile picture file
  });

  const handleError = (param) => {
  console.log(profileForm[param])
  if (!profileForm[param].trim()) {
    setError(`This field is required`);
  } else {
    setError('');
    nextStep();
  }
};

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Use appropriate logic for handling different input types
    const inputValue = type === 'file' ? e.target.files[0] : value;

    setProfileForm({
      ...profileForm,
      [name]: inputValue,
    });
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = async (e,profilePic=null) => {
    e.preventDefault();
    if(!error)
    {
         const formData = new FormData();
    formData.append('first_name', profileForm.first_name);
    formData.append('last_name', profileForm.last_name);
    formData.append('link', profileForm.link);
    formData.append('bio', profileForm.bio);
    formData.append('date_of_birth', profileForm.date_of_birth);

    if (profilePic)
    {
        formData.append('profile_pic', profilePic);
    }
    console.log(formData);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`${API_BASE_URL}userprofile/`, formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log(response.data);
      alert("Profile Completion successful");
      navigate('/success');
    } catch (error) {
      console.error('Error during profile completion:', error.response.data.error);
    }

    }


  };

  const renderFormStep = () => {
  switch (step) {
    case 1:
      return <Step1 profileForm={profileForm} handleInputChange={handleInputChange} error={error} handleError={handleError} />;
    case 2:
      return <Step2 profileForm={profileForm} handleInputChange={handleInputChange} prevStep={prevStep} error={error} handleError={handleError} />;
    case 3:
      return <Step3 profileForm={profileForm} handleInputChange={handleInputChange} prevStep={prevStep} error={error} handleError={handleError} />;
    case 4:
      return <Step4 profileForm={profileForm} handleInputChange={handleInputChange} prevStep={prevStep} error={error} handleError={handleError} />;
    case 5:
      return <Step5 profileForm={profileForm} handleInputChange={handleInputChange} prevStep={prevStep} error={error} handleError={handleError} />;
    case 6:
      return <Step6 profileForm={profileForm} handleInputChange={handleInputChange} prevStep={prevStep} handleFormSubmit={handleFormSubmit}  />;
    default:
      return null;
  }
};
  return (
    <>
      <div className="full-container">
      <BaseLayout />
      <div>
        <h2>Complete Your Profile - Step {step}</h2>
        <form onSubmit={handleFormSubmit}>
          {renderFormStep()}
        </form>
      </div>
      </div>
    </>
  );
};

export default UserProfileCompletion;