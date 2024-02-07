import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api/';
import './editprofile.css';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ onEditCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    link: '',
    bio: '',
    date_of_birth: '',
    profile_pic: undefined,
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch user profile data and populate the form
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}getprofile/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        const userProfile = response.data;
        console.log(userProfile);
        setFormData(userProfile);
        //console.log(formData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
    }, []);  // Run this effect only once on component mount

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
      console.log(formData);
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

        const response = await axios.put(`${API_BASE_URL}editprofile/`, formDataWithProfilePic, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        setSuccess(true);
        console.log(formData);
        console.log('success');
        alert("Profile edit successful");
        //navigate('/displayprofile');
      } catch (error) {
        setError(error.response.data);
      }
    };

  return (
  <>
    <div className="edit-profile-modal">
    <div className="edit-profile-container">
      <h2 className="edit-profile-header">Edit Profile</h2>
      <button className="close-button" onClick={onEditCancel}>&times;</button>

      {error && <p className="edit-profile-error">Error: {error}</p>}
      <form className="edit-profile-form"  encType="multipart/form-data">

        {/* Ensure that the input names match the field names in your Django model */}

        <label className="edit-profile-label">First Name
            <input className="edit-profile-input" type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
            </label>

            <label className="edit-profile-label">Last Name
            <input className="edit-profile-input" type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
            </label>

            <label className="edit-profile-label">Link
            <input className="edit-profile-input" type="text" name="link" value={formData.link} onChange={handleInputChange} />
            </label>

            <label className="edit-profile-label">Bio
            <textarea name="bio" value={formData.bio} onChange={handleInputChange} />
            </label>

            <label className="edit-profile-label">Date of Birth
            <input className="edit-profile-input" type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} />
            </label>

            <label className="edit-profile-label">Profile Picture
              <input className="edit-profile-file-input" type="file" accept="image/*" name="profile_pic" onChange={handleInputChange} />
            </label>

            <button className="edit-profile-submit" onSubmit={handleSubmit}>Save changes</button>
          </form>
        </div>
        </div>
        </>
  );
};

export default EditProfile;
