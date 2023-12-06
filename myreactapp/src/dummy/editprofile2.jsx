import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api/';


const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    link: '',
    bio: '',
    date_of_birth: '',
    profile_pic: undefined,
  });

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

  if (type === 'file' && e.target.files.length > 0) {
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
    console.log(formData);
    try {

      const response = await axios.put(`${API_BASE_URL}editprofile/`, formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      setSuccess(true);
      console.log("success");
      //console.log(formData);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      {success && <p>Profile updated successfully!</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Render your form inputs based on the formData state */}
        {/* Ensure that the input names match the field names in your Django model */}
        <label>Username
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
        </label>

        <label>Email
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>

        <label>First Name
        <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
        </label>

        <label>Last Name
        <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
        </label>

        <label>Link
        <input type="text" name="link" value={formData.link} onChange={handleInputChange} />
        </label>

        <label>Bio
        <textarea name="bio" value={formData.bio} onChange={handleInputChange} />
        </label>

        <label>Date of Birth
        <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} />
        </label>

        <label>Profile Picture
        <input type="file" accept="image/*" name="profile_pic" onChange={handleInputChange} />
        </label>

        {/* Add other fields as needed */}
        <input type="submit" value="Save Changes" />
      </form>
    </div>
  );
};

export default EditProfile;
