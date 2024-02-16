import { FaInstagram, FaFacebook, FaLink } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditExternalLinks from '../EditProfile/edit_external_links.jsx';
import { FaEdit } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:8000/api/';

const ExternalLinks = ({ isDifferentProfile = false, userId = null }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUserProfile = (newProfile) => {
    setUserProfile(newProfile);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let response;
        if (isDifferentProfile) {
          console.log('i am inside');
          response = await axios.get(`${API_BASE_URL}get-profile-by-id/external-links/${userId}/`);
        } else {
          const token = localStorage.getItem('token');
          response = await axios.get(`${API_BASE_URL}get-profile/external-links`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
        }

        setUserProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [isDifferentProfile, userId]);

  const [isEditing, setIsEditing] = useState(false);
  const [editComponent, setEditComponent] = useState('');

  const handleEditClick = (component) => {
    setIsEditing(true);
    setEditComponent(component);
  };

  const showEditButton = userProfile && (userProfile.instagram || userProfile.facebook || userProfile.portfolioLink || userProfile.externalLink);

  return (
    <>
      {isDifferentProfile ? (userProfile && (
        <div className="external-links-container">
          <div className="external-links">
            {userProfile.instagram && (
              <p>
                <FaInstagram />
                <a href={userProfile.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </p>
            )}

            {userProfile.facebook && (
              <p>
                <FaFacebook />
                <a href={userProfile.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </p>
            )}

            {userProfile.portfolioLink && (
              <p>
                <FaLink />
                <a href={userProfile.portfolioLink} target="_blank" rel="noopener noreferrer">
                  My Portfolio
                </a>
              </p>
            )}

            {userProfile.externalLink && (
              <p>
                <FaLink />
                <a href={userProfile.externalLink} target="_blank" rel="noopener noreferrer">
                  My Website
                </a>
              </p>
            )}
          </div>
        </div>
        )
        ):(
        userProfile && (
         <div className="external-links-container">
          <div className="external-links">
            {userProfile.instagram && (
              <p>
                <FaInstagram />
                <a href={userProfile.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </p>
            )}

            {userProfile.facebook && (
              <p>
                <FaFacebook />
                <a href={userProfile.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </p>
            )}

            {userProfile.portfolioLink && (
              <p>
                <FaLink />
                <a href={userProfile.portfolioLink} target="_blank" rel="noopener noreferrer">
                  My Portfolio
                </a>
              </p>
            )}

            {userProfile.externalLink && (
              <p>
                <FaLink />
                <a href={userProfile.externalLink} target="_blank" rel="noopener noreferrer">
                  My Website
                </a>
              </p>
            )}
          </div>

          <button
            className="edit-links-button"
            onClick={() => handleEditClick('edit_external_links')}
          >
            {showEditButton ? <FaEdit size={15}/> : 'Add External Links'}
          </button>

          {isEditing && editComponent && (
            <EditExternalLinks renderComponent={editComponent} onEditCancel={() => setIsEditing(false)} updateUserProfile={updateUserProfile} />
          )}
        </div>
      ))}
    </>
  );
};

export default ExternalLinks;
