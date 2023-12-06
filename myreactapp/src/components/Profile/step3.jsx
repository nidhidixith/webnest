import React from 'react';
import './profile.css';

const Step3 = ({ profileForm, handleInputChange, prevStep, nextStep }) => (
  <>

    <div className="step-container">
      <label>
        Link:
        <input type="text" name="link" value={profileForm.link} onChange={handleInputChange} />
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

export default Step3;
