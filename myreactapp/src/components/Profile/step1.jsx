import React from 'react';
import './profile.css';

const Step1 = ({ profileForm, handleInputChange, error, handleError }) =>(
  <>
    <div className="step-container">
    {error && <p className="error-message">{error}</p>}
      <label>
        First Name:
        <input type="text" name="first_name" value={profileForm.first_name} onChange={handleInputChange} />
      </label>
    </div>
    <div className="pagination-container">
      <button className="pagination-button" onClick={handleError}>
        Next
      </button>
    </div>
  </>
);


export default Step1;