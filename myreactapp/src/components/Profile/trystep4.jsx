import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './trystep4.css'; // Import the CSS file for styling
import InterestSelector from '../Profile/interest_selector.jsx';

const TryStep4 = ({ profileForm, handleAreasOfInterestChange, nextStep }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedRelatedFields, setSelectedRelatedFields] = useState([]);
  const [error, setError] = useState('');

  const handleNextClick = () => {
    if (selectedInterests.length === 0) {
      setError('Please select at least one area of interest.');
    } else {
      // Handle the submission logic here
      // For example, navigate to the next page
      handleAreasOfInterestChange('areas_of_interest', selectedInterests);
      console.log("Selected interests:",selectedInterests,selectedRelatedFields);
      nextStep();
    }
  };

  return (
    <div className="step4-container">
      <div className="outer-step4-container">
        {error && <p className="error-message">{error}</p>}
        <h1>Step 4: Select up to ten areas of interest</h1>

        <InterestSelector
          selectedInterests={selectedInterests}
          setSelectedInterests={setSelectedInterests}
          selectedRelatedFields={selectedRelatedFields}
          setSelectedRelatedFields={selectedRelatedFields}
          setError={setError}
        />

        <button className="button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TryStep4;