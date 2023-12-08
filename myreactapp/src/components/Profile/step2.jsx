import React from 'react';
import './profile.css';

const Step2 = ({ profileForm, handleInputChange, prevStep, error, handleError}) => (
  <>

    <div className="step-container">
    {error && <p className="error-message">{error}</p>}
      <label>
        Last Name:
        <input type="text" name="last_name" value={profileForm.last_name} onChange={handleInputChange} />
      </label>
    </div>
    <div className="pagination-container">
      <button className="pagination-button" onClick={prevStep}>
        Previous
      </button>
      <button className="pagination-button" onClick={handleError}>
        Next
      </button>
    </div>

  </>
);

export default Step2;
