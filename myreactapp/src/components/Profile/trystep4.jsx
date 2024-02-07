import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './trystep4.css'; // Import the CSS file for styling

const TryStep4 = ({ profileForm, handleAreasOfInterestChange, nextStep }) => {
  const navigate = useNavigate();

  const availableInterests = [
    'Painting', 'Singing', 'Dance', 'Acting', 'Writing', 'Poetry', 'Blogging', 'Vlogging', 'Photography',
    'Design', 'Travel', 'Cinematography', 'Animation', 'Health',
    'Fashion', 'Fitness', 'Cooking', 'Podcasting', 'Sports', 'Gaming'
  ];

  const relatedFields = {
    'Painting': ['Drawing', 'Etching', 'Concept Art', 'Cartooning', 'Comics', 'Calligraphy'],
    'Acting': ['Comedy', 'Puppetry', 'Mime'],
    'Writing': ['Content Writing'],
    'Cinematography': ['Video editing', 'Film Direction'],
    'Fashion': ['Styling', 'Make Up'],
    'Fitness': ['Yoga', 'Nutrition', 'Meditation'],
    'Cooking':['Drawing', 'Etching', 'Concept Art', 'Cartooning', 'Comics', 'Calligraphy'],
    'Sports':['Drawing', 'Etching', 'Concept Art', 'Cartooning', 'Comics', 'Calligraphy'],
  };

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedRelatedFields, setSelectedRelatedFields] = useState([]);
  const [error, setError] = useState('');

  const toggleSelection = (item, type) => {
  // Reset error state when a valid selection is made
  setError('');

  const totalSelectedCount = selectedInterests.length + selectedRelatedFields.length;

  if (type === 'interest') {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter(selectedItem => selectedItem !== item));
    } else {
      if (totalSelectedCount < 10) {
        setSelectedInterests([...selectedInterests, item]);
      } else {
        setError('You can only select up to 10 areas of interest.');
      }
    }
  } else if (type === 'field') {
    if (selectedRelatedFields.includes(item)) {
      setSelectedRelatedFields(selectedRelatedFields.filter(selectedItem => selectedItem !== item));
    } else {
      if (totalSelectedCount < 10) {
        setSelectedRelatedFields([...selectedRelatedFields, item]);
      } else {
        setError('You can only select up to 10 areas of interest.');
      }
    }
  }
};

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
        <div className="interest-selector-container">
          {availableInterests.map(interest => (
            <div
              key={interest}
              className={`bubble ${selectedInterests.includes(interest) ? 'selected' : ''}`}
              onClick={() => toggleSelection(interest, 'interest')}
            >
              {interest}
            </div>
          ))}
          {/*
          {selectedInterests.map(interest => (
            <div key={interest} className="related-field">
              {relatedFields[interest]?.map(field => (
                <div
                  key={field}
                  className={`related-bubble ${selectedRelatedFields.includes(field) ? 'selected' : ''}`}
                  onClick={() => toggleSelection(field, 'field')}
                >
                  {field}
                </div>
              ))}
            </div>
          ))}*/}
        </div>
        <button className="button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TryStep4;