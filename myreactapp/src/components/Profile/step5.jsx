import React from 'react';
import './profile.css';

const Step5 = ({ profileForm, handleInputChange, prevStep, nextStep }) => (
  <>

    <div className="step-container">
      <label>
        Date of Birth:
        <input type="date" name="date_of_birth" value={profileForm.date_of_birth} onChange={handleInputChange} />
      </label>
      <br />
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

export default Step5;
