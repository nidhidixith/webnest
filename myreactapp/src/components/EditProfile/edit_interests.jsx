import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api/';
import './editprofile.css';

const EditInterests = ({ renderComponent, onEditCancel, updateUserProfile }) => {
  const [formData, setFormData] = useState({
    areas_of_interest: [],
  });

  //const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem('token');

  return (
    <>
      <div className="edit-profile-modal">
        <div className="edit-profile-container">
      <button className="close-button" onClick={onEditCancel}>
            &times;
          </button>

          {error && <p className="edit-profile-error">Error: {error}</p>}
      <h2 className="edit-profile-header">Edit Interests</h2>
      <label className="edit-profile-label">Interests</label>
      {/*<input
        className="edit-profile-input"
        type="text"
        name="areas_of_interest"
        value={formData.areas_of_interest}
        onChange={handleInputChange}
      />*/}
      <button className="edit-profile-submit" >
            Save changes
          </button>
        </div>
      </div>
    </>
  );
};

export default EditInterests;
