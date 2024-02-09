import { FaInstagram, FaFacebook, FaLink } from 'react-icons/fa'; // Import icons from a library
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditExternalLinks from '../EditProfile/edit_external_links.jsx'; // Import the EditProfile component

const API_BASE_URL = 'http://localhost:8000/api/';

const ExternalLinks = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateUserProfile = (newProfile) => {
        setUserProfile(newProfile);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}get-profile/external-links`, {
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

    <div className="external-links-container">
     <div className="external-links">
      {userProfile.instagram && (<p>
        <FaInstagram /><a href={userProfile.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
      </p>)}

      {userProfile.facebook && (<p>
        <FaFacebook /><a href={userProfile.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
      </p>)}

      {userProfile.portfolioLink && (<p>
        <FaLink /><a href={userProfile.portfolioLink} target="_blank" rel="noopener noreferrer">My Portfolio</a>
      </p>)}

      {userProfile.externalLink&& (<p>
        <FaLink /><a href={userProfile.externalLink} target="_blank" rel="noopener noreferrer">My Website</a>
      </p>)}
      </div>

      <button
        className="edit-links-button"
        onClick={() => handleEditClick('edit_external_links')}
      >
        Edit
      </button>

      {isEditing  && editComponent && <EditExternalLinks renderComponent={editComponent} onEditCancel={() => setIsEditing(false)}
      updateUserProfile={updateUserProfile}/>}
    </div>
    )}
    </>
  );
};

export default ExternalLinks;