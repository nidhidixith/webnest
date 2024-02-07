import React from 'react';
import './tryprofile.css';

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
      <button className="pagination-button" onClick={() => handleError("first_name")}>
        Next
      </button>
    </div>
  </>
);


export default Step1;



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
      <button className="pagination-button" onClick={() => handleError("last_name")}>
        Next
      </button>
    </div>

  </>
);

export default Step2;


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


import React, { useState } from 'react';
import './profile.css';

const Step6 = ({ profileForm, handleInputChange, prevStep, handleFormSubmit }) => {
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    // You can add additional validation for the file type and size if needed
    setProfilePic(file);
  };

  return (
    <>
      <div className="step-container">
        <label>
          Profile Picture:
          <input type="file" accept="image/*"  onChange={handleFileChange} />
        </label>
        <br />
      </div>

      <div className="pagination-container">
        <button className="pagination-button" onClick={prevStep}>
          Previous
        </button>
        <button className="pagination-button" onClick={(e) => {
        if(profilePic)
        {
            handleFormSubmit(e, profilePic);
        }
        else
        {
            handleFormSubmit(e);
        }
        }}>
          Complete Profile
        </button>
      </div>

    </>
  );
};

export default Step6;








