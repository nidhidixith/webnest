import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './displayprofile.css'; // Import your CSS file
import EditProfile from '../EditProfile/editprofile.jsx'; // Import the EditProfile component

const API_BASE_URL = 'http://localhost:8000/api/';

const BasicDetails = ({userProfile, updateUserProfile}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editComponent, setEditComponent] = useState('');

    const handleEditClick = (component) => {
        setIsEditing(true);
        setEditComponent(component);
    };

    return (
        <>
            <div className="bio-container">
                <div className="bio-field">
                    <h2 className="bio-h2">Bio</h2>
                    <p>{userProfile.bio}</p>
                </div>

                    <button
                        className="edit-bio-button"
                        onClick={() => handleEditClick('edit_bio')}
                    >
                    Edit
                    </button>

                {isEditing  && editComponent && <EditProfile renderComponent={editComponent}
                onEditCancel={() => setIsEditing(false)}
                updateUserProfile={updateUserProfile}/>}
            </div>
        </>
    );
};

export default BasicDetails;
