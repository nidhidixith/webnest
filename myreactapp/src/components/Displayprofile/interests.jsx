import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './displayprofile.css'; // Import your CSS file
import EditProfile from '../EditProfile/editprofile.jsx'; // Import the EditProfile component

const Interests = ({ userProfile, updateUserProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editComponent, setEditComponent] = useState('');

    const handleEditClick = (component) => {
        setIsEditing(true);
        setEditComponent(component);
    };

  return (
    <>
      <div className="interests-container">
        <h2 className="interests-h2">Areas of Interest</h2>

        {userProfile.areas_of_interest && (
          <ul>
            {Object.values(userProfile.areas_of_interest).join(' ').split(',').map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        )}

        <button className="edit-interests-button" onClick={() => handleEditClick('edit_interests')}>
          Edit
        </button>

        {isEditing && editComponent && <EditProfile renderComponent={editComponent} onEditCancel={() => setIsEditing(false)}
         updateUserProfile={updateUserProfile}/>}
      </div>
    </>
  );
};

export default Interests;
