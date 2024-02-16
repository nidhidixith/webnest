import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InterestSelector from '../Profile/interest_selector.jsx';
import './editprofile.css';

const API_BASE_URL = 'http://localhost:8000/api/';

const EditInterests = ({ onEditCancel, updateUserProfile }) => {
  const [formData, setFormData] = useState({
    areas_of_interest: [],
  });

  const [error, setError] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedRelatedFields, setSelectedRelatedFields] = useState([]);
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}get-profile/interests`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleNextClick = async (e) => {
    e.preventDefault();

    if (selectedInterests.length === 0) {
      setError('Please select at least one area of interest.');
    } else {
      try {
        const formDataWithProfilePic = new FormData();
        formDataWithProfilePic.append('areas_of_interest', selectedInterests);

        const response = await axios.put(`${API_BASE_URL}edit-profile/interests`, formDataWithProfilePic, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        alert("Profile edit successful");
        onEditCancel();
        setSuccess(true);
        updateUserProfile(response.data);
      } catch (error) {
        setError(error.response.data);
      }
    }
  };

  return (
    <div className="edit-profile-modal">
      <div className="edit-profile-container">
        <button className="close-button" onClick={onEditCancel}>&times;</button>
        {error && <p className="edit-profile-error">Error: {error}</p>}
        <h2 className="edit-profile-header">Edit Interests</h2>
        <InterestSelector
          selectedInterests={selectedInterests}
          setSelectedInterests={setSelectedInterests}
          selectedRelatedFields={selectedRelatedFields}
          setSelectedRelatedFields={selectedRelatedFields}
          setError={setError}
        />
        <button className="edit-profile-submit" onClick={handleNextClick}>
          Save changes
        </button>
      </div>
    </div>
  );
};

export default EditInterests;
