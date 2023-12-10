import React from 'react';
import './profile.css';

const Step4 = ({ profileForm, handleInputChange, prevStep, error, handleError }) => (
  <>

    <div className="step-container">
    {error && <p className="error-message">{error}</p>}
      <label>
        Bio:
        <textarea name="bio" value={profileForm.bio} onChange={handleInputChange}></textarea>
      </label>
    </div>
    <div className="pagination-container">
      <button className="pagination-button" onClick={prevStep}>
        Previous
      </button>
      <button className="pagination-button" onClick={() => handleError("bio")}>
        Next
      </button>
    </div>

  </>
);

export default Step4;
