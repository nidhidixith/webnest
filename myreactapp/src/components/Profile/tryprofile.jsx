import React, { useState, useEffect } from 'react';

import TryStep1 from './trystep1';
import TryStep2 from './trystep2';
import TryStep3 from './trystep3';
import TryStep4 from './trystep4';
import TryStep5 from './trystep5';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './tryprofile.css';

const API_BASE_URL = 'http://localhost:8000/api/';

const TryUserProfileCompletion = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    bio: '',
    instagram: '',
    facebook:'',
    portfolioLink:'',
    externalLink:'',
    areas_of_interest:[],
    profile_pic: null,  // Use null for the profile picture file
  });

  {/*const handleError = (param) => {
  console.log(profileForm[param])
  if (!profileForm[param].trim()) {
    setError(`This field is required`);
  } else {
    setError('');
    nextStep();
  }
  };*/}

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  {/*const handleSkip = () => {
    // Add logic here to handle the "Skip" action
    // For example, you might want to set default values or leave the field empty
    if (step < 5) { // Adjust the number based on the total number of steps
       nextStep();
     } else {
    // Handle the case when it's the last step
    // For example, submit the form or navigate to another page
       handleFormSubmit(); // Call the submit function as an example
    }
  };*/}

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Use appropriate logic for handling different input types
    const inputValue = type === 'file' ? e.target.files[0] : value;

    setProfileForm({
      ...profileForm,
      [name]: inputValue,
    });
  };

  const handleAreasOfInterestChange = (name, value) => {
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = async (e,profilePic=null) => {
    e.preventDefault();

    console.log("First Name:",profileForm.first_name);
    console.log("Last Name:",profileForm.last_name);
    console.log("Dob:",profileForm.date_of_birth);
    console.log("Bio:",profileForm.bio);
    console.log("instagram:",profileForm.instagram);
    console.log("facebook:",profileForm.facebook);
    console.log("PortFolio:",profileForm.portfolioLink);
    console.log("External Link:",profileForm.externalLink);
    console.log("Areas of interest:",profileForm.areas_of_interest);
    console.log("Profile Pic:",profileForm.profilePic);

    const formData = new FormData();
    formData.append('first_name', profileForm.first_name);
    formData.append('last_name', profileForm.last_name);
    formData.append('date_of_birth', profileForm.date_of_birth);
    formData.append('bio', profileForm.bio);
    formData.append('instagram', profileForm.instagram);
    formData.append('facebook', profileForm.facebook);
    formData.append('portfolioLink', profileForm.portfolioLink);
    formData.append('externalLink', profileForm.externalLink);
    formData.append('areas_of_interest', profileForm.areas_of_interest);


    if (profilePic)
    {
        formData.append('profile_pic', profilePic);
    }

    // Iterate over formData entries and log them
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const token = localStorage.getItem('token');
    //navigate('/posts');

    try {
      const response = await axios.put(`${API_BASE_URL}userprofile/`, formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log(response.data);
      alert("Profile Completion successful");
      navigate('/home');
    } catch (error) {
      console.error('Error during profile completion:', error.response.data.error);
    }

  };

  const renderFormStep = () => {
  switch (step) {
    case 1:
      return <TryStep1 nextStep={nextStep}/>;
    case 2:
      return <TryStep2 profileForm={profileForm} handleInputChange={handleInputChange} nextStep={nextStep}/>;
    case 3:
      return <TryStep3 profileForm={profileForm} handleInputChange={handleInputChange} nextStep={nextStep}/>;
    case 4:
      return <TryStep4 profileForm={profileForm} handleAreasOfInterestChange={(name, value) => handleAreasOfInterestChange(name, value)} nextStep={nextStep}/>;
    case 5:
      return <TryStep5 profileForm={profileForm} handleFormSubmit={handleFormSubmit} />;
    default:
      return null;
  }
};
  return (
    <>
        {renderFormStep()}
        {/*<form onSubmit={handleFormSubmit}>
          {renderFormStep()}
        </form>*/}
    </>
  );
};

export default TryUserProfileCompletion;