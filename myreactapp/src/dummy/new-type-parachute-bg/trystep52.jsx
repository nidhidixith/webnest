import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './trystep5.css'; // Import the CSS file for styling

const TryStep5 = () => {
  const navigate = useNavigate();

  const availableInterests = [
    'Painting', 'Singing', 'Dance', 'Acting', 'Writing', 'Poetry', 'Blogging', 'Vlogging', 'Photography',
    'Design', 'Travel', 'Cinematography', 'Fitness', 'Animation',
    'Fashion', 'Health', 'Cooking', 'Podcasting','Sports','Gaming'
  ];

  // Map interests to related fields
  const relatedFields = {
    'Painting': ['Drawing', 'Etching', 'Concept Art', 'Cartooning', 'Comics', 'Calligraphy'],
    'Acting': ['Comedy', 'Puppetry', 'Mime'],
    'Writing': ['Content Writing'],
    //'Travel' : [],
    'Cinematography' : ['Video editing', 'Film Direction'],
    'Fashion': ['Styling', 'Make Up'],
    'Fitness': ['Yoga', 'Nutrition'],
    'Health': ['Yoga','Nutrition','Meditation'],


    //'Technology': ['Programming', 'Web Development', 'Data Science'],
    // Add more related fields as needed
  };

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  const handleInterestClick = (interest) => {
      if (selectedInterests.length < 10) {
        setSelectedInterests((prevInterests) => [...prevInterests, interest]);
      }
  };

  const handleRemoveInterest = (interest) => {
    setSelectedInterests((prevInterests) => prevInterests.filter((item) => item !== interest));
  };

  const handleSubmit = () => {
    if (selectedInterests.length >= 1) {
      // Handle the submit logic here
      // For example, send the selected interests to the server
      console.log('Selected Interests:', selectedInterests);
      setErrorMessage(''); // Reset error message
      navigate('/posts');
    } else {
      setErrorMessage('Please select at least 1 area of interest');
    }
  };

  return (
    <div className="step5-container">
    <div className="interest-selector-container">
      <div className="interest-bubbles">
        {availableInterests.flatMap((interest) => {
          const isSelected = selectedInterests.includes(interest);
          return (
            <div
              key={interest}
              className={`bubble ${isSelected ? 'selected' : ''}`}
              onClick={() => handleInterestClick(interest)}
            >
              {interest}
            </div>
          );
        })}

        {selectedInterests.flatMap((selectedInterest) => relatedFields[selectedInterest] || []).map((relatedField) => (
          <div
            key={relatedField}
            className={`related-bubble ${selectedInterests.includes(relatedField) ? 'selected' : ''}`}
            onClick={() => handleInterestClick(relatedField)}
          >
            {relatedField}
          </div>
        ))}

      </div>

      <div className="selected-bubbles">
        <p>Selected Interests:</p>
        {selectedInterests.map((selectedInterest, index) => (
          <div key={index} className="selected-bubble">
            {selectedInterest}
            <span className="close-button" onClick={() => handleRemoveInterest(selectedInterest)}>&times;</span>
          </div>
        ))}
      </div>


      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button
        className="submit-button"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
    </div>
  );

};

export default TryStep5;