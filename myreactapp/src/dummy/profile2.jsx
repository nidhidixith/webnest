import React, { useState, useEffect } from 'react';
import BaseLayout from '../BaseLayout/baselayout';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api/';

const UserProfileCompletion = () => {
    const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profileForm, setProfileForm] = useState({
    link: '',
    bio: '',
    date_of_birth: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    // Add your form submission logic here
    const formData = new FormData();
    formData.append('link', profileForm.link);
    formData.append('bio', profileForm.bio);
    formData.append('date_of_birth', profileForm.date_of_birth);
    const token = localStorage.getItem('token');
    //console.log(token);
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
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return <Step1 profileForm={profileForm} handleInputChange={handleInputChange} nextStep={nextStep} />;
      case 2:
        return <Step2 profileForm={profileForm} handleInputChange={handleInputChange} prevStep={prevStep} nextStep={nextStep} />;
      case 3:
        return <Step3 profileForm={profileForm} handleInputChange={handleInputChange} prevStep={prevStep} handleFormSubmit={handleFormSubmit} />;
      default:
        return null;
    }
  };

  return (
    <>
      <BaseLayout />
      <div>
        <h2>Complete Your Profile - Step {step}</h2>
        <form onSubmit={handleFormSubmit}>
          {renderFormStep()}
        </form>
      </div>
    </>
  );
};

export default UserProfileCompletion;
