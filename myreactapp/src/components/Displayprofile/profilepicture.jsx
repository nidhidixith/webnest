import React, { useState } from 'react';
import './displayprofile.css'; // Import your CSS file
import Rating from 'react-rating-stars-component'; // Import the rating component
import EditNameProfile from '../EditProfile/edit_name_profile_pic.jsx'; // Import the EditProfile component
import EditProfile from '../EditProfile/editprofile.jsx'; // Import the EditProfile component

const ProfilePicture = ({ userProfile, updateUserProfile }) => {
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

        {isEditing && editComponent && <EditProfile renderComponent={editComponent} onEditCancel={() => setIsEditing(false)}
         updateUserProfile={updateUserProfile}/>}

    </div>
  );
};

export default ProfilePicture;
