import React, { useState } from 'react';

const InterestSelector = ({
  selectedInterests,
  setSelectedInterests,
  selectedRelatedFields,
  setSelectedRelatedFields,
  setError,
}) => {
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

  return (
    <div>
      <style>
        {`
          .interest-selector-container {
            flex-wrap: wrap;
            /*border: 2px solid green;*/
            overflow-y: auto; /* Enable vertical scrolling if needed */
          }

          .bubble, .related-bubble {
            display: inline-block;
            margin: 5px;
            padding: 10px;
            background-color: #e0e0e0;
            border-radius: 20px;
            cursor: pointer;
          }

          .bubble.selected, .related-bubble.selected {
            background-color: #7ac5cd;
            color: #ffffff;
          }

          .related-field {
            display: inline;
            flex-wrap: wrap;
          }

          .related-bubble {
            animation: fadeIn 2s;
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
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
      </div>
    </div>
  );
};

export default InterestSelector;
