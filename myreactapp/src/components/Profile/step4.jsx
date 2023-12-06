import React from 'react';
import './profile.css';

const Step4 = ({ profileForm, handleInputChange, prevStep, nextStep }) => (
  <>

    <div className="step-container">
      <label>
        Bio:
        <textarea name="bio" value={profileForm.bio} onChange={handleInputChange}></textarea>
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

export default Step4;
