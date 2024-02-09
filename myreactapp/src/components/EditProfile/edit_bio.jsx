import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api/';
import './editprofile.css';

const EditBio = ({ renderComponent, onEditCancel, updateUserProfile }) => {

  const [formData, setFormData] = useState({
    bio: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch user profile data and populate the form
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}get-profile/bio`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const userProfile=response.data;
        setFormData(userProfile);

      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []); // Run this effect only once on component mount

  const handleInputChange = (e) => {
    const { name, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
    } else {
      const value = e.target.value;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formDataWithProfilePic = new FormData();

        // Append all other form data fields
        Object.keys(formData).forEach((key) => {
          if (key !== 'profile_pic') {
            formDataWithProfilePic.append(key, formData[key]);
          }
        });

        // If a new profile picture is selected, append it; otherwise, use the existing one
        if (formData.profile_pic instanceof File) {
          formDataWithProfilePic.append('profile_pic', formData.profile_pic);
        }

        const response = await axios.put(`${API_BASE_URL}edit-profile/bio`, formDataWithProfilePic, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('success');
        console.log(response.data);

        alert("Profile edit successful");
        onEditCancel();
        setSuccess(true);
        updateUserProfile(response.data);

        //navigate('/displayprofile');
      } catch (error) {
        setError(error.response.data);
      }
    };

  return (
    <>
      <div className="edit-profile-modal">
        <div className="edit-profile-container">
          <button className="close-button" onClick={onEditCancel}>&times;</button>

          {error && <p className="edit-profile-error">Error: {error}</p>}

          <h2 className="edit-profile-header">Edit Bio</h2>
          <label className="edit-profile-label">Bio</label>
          <textarea
            className="edit-bio-input"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
          <button className="edit-profile-submit" onClick={handleSubmit}>Save changes</button>
        </div>
      </div>
    </>
  );
};

export default EditBio;
