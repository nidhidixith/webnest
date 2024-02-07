import { FaInstagram, FaFacebook, FaLink } from 'react-icons/fa'; // Import icons from a library
import React, { useEffect, useState } from 'react';
import EditExternalLinks from '../EditProfile/edit_external_links.jsx'; // Import the EditProfile component
import EditProfile from '../EditProfile/editprofile.jsx'; // Import the EditProfile component


const ExternalLinks = ({ userProfile, updateUserProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editComponent, setEditComponent] = useState('');

  const handleEditClick = (component) => {
    setIsEditing(true);
    setEditComponent(component);
  };

  return (
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

      {isEditing  && editComponent && <EditProfile renderComponent={editComponent} onEditCancel={() => setIsEditing(false)}
      updateUserProfile={updateUserProfile}/>}
    </div>
  );
};

export default ExternalLinks;