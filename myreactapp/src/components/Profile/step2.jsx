import React from 'react';
import './profile.css';

const Step2 = ({ profileForm, handleInputChange, prevStep, nextStep }) => (
  <>

    <div className="step-container">
      <label>
        Last Name:
        <input type="text" name="last_name" value={profileForm.last_name} onChange={handleInputChange} />
      </label>
    </div>
    <div className="pagination-container">
      <button className="pagination-button" onClick={prevStep}>
        Previous
      </button>
      <button className="pagination-button" onClick={nextStep}>
        Next
      </button>
    </div>

  </>
);

export default Step2;
