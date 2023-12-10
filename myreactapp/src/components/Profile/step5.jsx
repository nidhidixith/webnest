import React from 'react';
import './profile.css';

const Step5 = ({ profileForm, handleInputChange, prevStep, error, handleError }) => (
  <>

    <div className="step-container">
    {error && <p className="error-message">{error}</p>}
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
      <button className="pagination-button" onClick={() => handleError("date_of_birth")}>
        Next
      </button>
    </div>

  </>
);

export default Step5;
