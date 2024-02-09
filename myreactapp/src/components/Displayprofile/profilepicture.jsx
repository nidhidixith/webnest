import React, { useEffect, useState } from 'react';
import './displayprofile.css'; // Import your CSS file
import axios from 'axios';
import Rating from 'react-rating-stars-component'; // Import the rating component
import EditNameProfilePic from '../EditProfile/edit_name_profile_pic.jsx'; // Import the EditProfile component

const API_BASE_URL = 'http://localhost:8000/api/';

const ProfilePicture = () => {
  const [userProfile, setUserProfile] = useState(null);

    const updateUserProfile = (newProfile) => {
        setUserProfile(newProfile);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}get-profile/basic-details`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setUserProfile(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [editComponent, setEditComponent] = useState('');

  const ratingChanged = (newRating) => {
    // Handle rating change if needed
    console.log(newRating);
  };

  const handleEditClick = (component) => {
    setIsEditing(true);
    setEditComponent(component);
  };

  return (
     <>-
     {userProfile && (
    <div className="profile-pic-container">
      <img
        className="profile-pic"
        src={`http://localhost:8000${userProfile.profile_pic}`}
        alt="Profile Picture"
      />
      <div className="profile-details">
        <div className="name-field">
          <p>{userProfile.first_name} {userProfile.last_name}</p>
        </div>
        <div className="rating-container">
          <Rating
            count={5}
            value={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        <div className="follow-button-container">
          <button>Follow</button>
          <p>0 followers</p>
        </div>
       </div>
        <button
        className="edit-profile-details-button"
        onClick={() => handleEditClick('edit_name_profile_pic')}
        >
        Edit
        </button>

        {isEditing && editComponent && <EditNameProfilePic renderComponent={editComponent} onEditCancel={() => setIsEditing(false)}
         updateUserProfile={updateUserProfile}/>}

    </div>
    )}
    </>
  );

};

export default ProfilePicture;
