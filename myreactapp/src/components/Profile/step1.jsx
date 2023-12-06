import React from 'react';
import './profile.css';

const Step1 = ({ profileForm, handleInputChange, nextStep }) => (
  <>

    <div className="step-container">
      <label>
        First Name:
        <input type="text" name="first_name" value={profileForm.first_name} onChange={handleInputChange} />
      </label>
      <br />
    </div>
    <div className="pagination-container">
      <button className="pagination-button" onClick={nextStep}>
        Next
      </button>
    </div>

  </>
);

export default Step1;
