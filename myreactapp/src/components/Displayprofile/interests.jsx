import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './displayprofile.css'; // Import your CSS file
import EditInterests from '../EditProfile/edit_interests.jsx'; // Import the EditProfile component

const API_BASE_URL = 'http://localhost:8000/api/';

const Interests = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateUserProfile = (newProfile) => {
        setUserProfile(newProfile);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}get-profile/interests`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setUserProfile(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const [isEditing, setIsEditing] = useState(false);
    const [editComponent, setEditComponent] = useState('');

    const handleEditClick = (component) => {
        setIsEditing(true);
        setEditComponent(component);
    };

  return (
    <>
      {userProfile && (

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

        {isEditing && editComponent && <EditInterests renderComponent={editComponent} onEditCancel={() => setIsEditing(false)}
         updateUserProfile={updateUserProfile}/>}
      </div>
      )}
    </>
  );
};

export default Interests;
