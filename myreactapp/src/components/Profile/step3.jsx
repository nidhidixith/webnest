import React from 'react';
import './profile.css';

const Step3 = ({ profileForm, handleInputChange, prevStep, error, handleError }) => (
  <>

    <div className="step-container">
    {error && <p className="error-message">{error}</p>}
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
      <button className="pagination-button" onClick={() => handleError("link")}>
        Next
      </button>
    </div>

  </>
);

export default Step3;
